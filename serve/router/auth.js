const express  = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('../db/conn');
const User = require('../model/userSchema');
const Grievances = require('../model/grievanceSchema');
const Blog = require('../model/blogSchema');
const Updates = require('../model/updateSchema');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const path = require('path');
const https = require('https');
const FileComplaint = require('../model/fileComplaint');
const nodemailer = require('nodemailer');
const Advertisement = require('../model/Advertisement');
const fs = require('fs');
const app = express();
app.use(express.json());

// router.get('/', (req, res) => {
//     res.send('Hello word this is from router.js');
// });


process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
// console.log('NODE_TLS_REJECT_UNAUTHORIZED:', process.env.NODE_TLS_REJECT_UNAUTHORIZED);

const agent = new https.Agent({
  rejectUnauthorized: false, // Note: This disables SSL certificate validation
});




// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: 'dc2leh1pm',
  api_key: '362438167496525',
  api_secret: 'xmlSRzbMQ3Kfn2bIji3OoT-5u_Q',
  secure: true,
  httpAgent: agent,
});
// const uploadDir = 'uploads';
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }

// Configure multer for file storage
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|pdf|doc|docx/; // Acceptable file types
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (extname) {
      return cb(null, true);
    } else {
      cb(new Error('Error: File type not supported'));
    }
  }
});


//using promises
// router.post('/register', (req, res) => {
//     const { name, email, phone, work, password, cpassword } = req.body;
//     if( !name || !email || !phone || !work || !password || !cpassword ){
//         return res.status(400).json({ error: "Please fill all the fields" });
//     }
//     console.log(req.body);
//     // res.json({ message: req.body });

//     User.findOne({ email: email })
//         .then((userExist) => {
//             if(userExist) {
//                 return res.status(422).json({ error: "Email already exists" });
//             }

//             const user  = new User({ name, email, phone, work, password, cpassword });
//             user.save().then(() => {
//                 res.status(201).json({ message: "user registered successfully" });
//             }).catch((err) => res.status(500).json({ error: "Failed to registered" }));
//         }).catch(err => {console.log(err); 
//     });
// });

//Using async-await
router.post('/register', async (req, res) => {
    const { name, email, phone, occupation, password, cpassword } = req.body;
    console.log(req.body);
    if( !name || !email || !phone || !occupation || !password || !cpassword ){
        return res.status(400).json({ error: "Please fill all the fields" });
    }
    
    try{
        const userExist = await User.findOne({ email: email });
        if(userExist) {
            return res.status(422).json({ error: "Email already exists" });
        }else if(password != cpassword) {
            return res.status(422).json({ error: "Password and Confirm passwords are not same" });
        }else{
        const user  = new User({ name, email, phone, occupation, password, cpassword });
        await user.save();
        res.status(201).json({ message: "user registered successfully" });
        }
    } catch (err) { 
        console.log(err);
    }
}); // above is for registration of user basically a form like structure

router.post('/signin', async (req, res) => {
    try{
        const { email, password } = req.body;
        if( !email || !password) {
            return res.status(400).json({ error: "Please fill all the fields" });
        }

        const userLogin = await User.findOne({ email: email });
        if(userLogin){
            const isMatch = await bcrypt.compare(password, userLogin.password);
            
            const token = await userLogin.generateAuthToken();
            console.log(token);
            
            if(!isMatch){
                res.status(400).json({ error: "Invalid credentials" });
            }else{
                res.json({ message: "user signin successfully" });
            }
        }else{
            res.status(400).json({ error: "Invalid credentials" });
        }
    } catch (err) {
        console.log(err);
    }
}); //after fiiling credentials when submit button is clicked it starts working

router.post('/grievances', upload.single('attachment'), async (req, res) => {
  const { complaintCategory, complaintType, name, fatherName, email, countryCode, phone, alternatePhone, country, state, city, pincode, disputedAmount, complaint } = req.body;
  try {
      const complaintNumber = generateComplaintNumber();
      const status = "Initiated";
      if (!req.file) {
          return res.status(400).json({ error: "No file uploaded" });
      }
      // Upload to Cloudinary
      const stream = cloudinary.uploader.upload_stream(
          { resource_type: 'auto' },
          async (error, result) => {
              if (error) {
                  console.error('Cloudinary upload error:', error);
                  return res.status(500).json({ error: 'Failed to upload attachment to Cloudinary' });
              }
              const grievance = new Grievances({ complaintCategory, complaintType, name, fatherName, email, countryCode, phone, alternatePhone, country, state, city, pincode, disputedAmount, complaint, attachment: result.secure_url, originalFileName: req.file.originalname, complaintNumber, status });
              await grievance.save();
              res.status(200).json({ message: "Successfully registered a complaint", complaintNumber });
          }
      );

      // Use the memory buffer to upload
      stream.end(req.file.buffer);

  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});



//To send mails of complaint data

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
   user: process.env.MAIL_ID,
   pass: process.env.APP_PASSWORD,
  },
 });

 const sendEmail = (fullname, email, mobile, caseType, state, complaintAgainst, disputedAmount, details) => {
  const mailOptions = {
   from: 'easylegal.co.in@gmail.com',
   to: 'easylegal.co.in@gmail.com',
   subject: 'New Complaint Filed',
   html: `
   <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
       <h3 style="color: #98142c;">Complaint Details from EasyLegal</h3>
       <hr style="border: 1px solid #98142c;">
       <p><strong>Name:</strong> ${fullname}</p>
       <p><strong>Email:</strong> ${email}</p>
       <p><strong>Mobile:</strong> ${mobile}</p>
       <p><strong>Case Type:</strong> ${caseType}</p>
       <p><strong>State:</strong> ${state}</p>
       <p><strong>Complaint Against:</strong> ${complaintAgainst}</p>
       <p><strong>Disputed Amount:</strong> ${disputedAmount}</p>
       <p><strong>Details:</strong> ${details}</p>
   </div>
   `,
 }; //organization is acknowledging the complaint here

 transporter.sendMail(mailOptions, function (error, info) {
   if (error) {
     console.log('Error in sending email  ' + error);
     return true;
   } else {
    console.log('Email sent: ' + info.response);
    return false;
   }
  });
 };

router.post('/fileComplaint', async (req, res) => {
  const { fullname, email, mobile, caseType, state, complaintAgainst, disputedAmount, details } = req.body;
  console.log(req.body);
  try{
      const fileComplaint  = new FileComplaint({ fullname, email, mobile, caseType, state, complaintAgainst, disputedAmount, details });
      await fileComplaint.save();
      sendEmail(fullname, email, mobile, caseType, state, complaintAgainst, disputedAmount, details);
      res.status(201).json({ message: "Complaint filed successfully" });
  } catch (err) { 
      console.log(err);
  }
});





router.get('/api/filedComplaints', async (req, res) => {
  try {
    const filedComplaints = await FileComplaint.find();
    res.json(filedComplaints);
} catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
}
});

router.get('/grievances/:complaintNumber', async (req, res) => {
    const { complaintNumber } = req.params;
    console.log(req.params);

    try {
        const grievance = await Grievances.findOne({ complaintNumber });
        if (grievance) {
            res.status(200).json(grievance);
        } else {
            res.status(404).json({ error: "Complaint number not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});


const generateComplaintNumber = () => {
    return 'COMP-' + Date.now() + '-' + Math.floor(Math.random() * 10000);
};
//generating complaint no.


// Fetch all complaints
router.get('/complaints', async (req, res) => {
    try {
        // Fetch users from the database
        const complaints = await Grievances.find();

        res.json(complaints);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});



// router.post('/api/blog', async (req, res) => {
//     try {
//       const newBlog = new Blog(req.body);
//       await newBlog.save();
//       res.status(201).json({ message: 'Blog saved successfully!' });
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to save blog' });
//     }
//   });

  // Set up multer for file uploads to disk

  // Define the API endpoint to save blog data
  router.post('/api/blog', upload.single('image'), async (req, res) => {
    try {
      // Get the file information
      const file = req.file;
  
      if (!file) {
        console.error('No file uploaded');
        return res.status(400).json({ error: 'No file uploaded' });
      }
  
      // Log the file details
      // console.log('File received:', file.originalname);
  
      // Upload to Cloudinary
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: 'auto' },
        async (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            return res.status(500).json({ error: 'Failed to upload image to Cloudinary' });
          }
  
          // console.log('File uploaded to Cloudinary:', result.secure_url);
  
          const newBlog = new Blog({
            title: req.body.title,
            subtitle: req.body.subtitle,
            content: req.body.content,
            tags: req.body.tags.split(',').map(tag => tag.trim()),
            publish: req.body.publish,
            image: result.secure_url, // Save the Cloudinary URL
          });
  
          await newBlog.save();
          // console.log('Blog saved successfully:', newBlog);
          res.status(201).json({ message: 'Blog saved successfully!' });
        }
      );
  
      // Use the memory buffer to upload
      stream.end(file.buffer);
  
    } catch (error) {
      console.error('Error saving blog:', error);
      res.status(500).json({ error: 'Failed to save blog' });
    }
  });
  

  router.get('/api/blogs', async (req, res) => {
    try {
      const blogs = await Blog.find({ publish: true }).sort({ publishDate: -1 }); // Fetch only published blogs
      console.log(blogs);
      res.json(blogs);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve blogs' });
    }
  });

  router.get('/api/relatedblogs', async (req, res) => {
    const limit = parseInt(req.query.limit) || 10; // Default to 10 if no limit provided
    const sort = req.query.sort === 'latest' ? { createdAt: -1 } : {};
    const excludeId = req.query.exclude;
  
    const query = excludeId ? { _id: { $ne: excludeId } } : {}; // Exclude the specified blog ID
  
    const blogs = await Blog.find(query).sort(sort).limit(limit);
    res.json(blogs);
  });

  router.get('/api/blogs/unpublish', async (req, res) => {
    try {
      const blogs = await Blog.find({ publish: false }); // Fetch only unpublished blogs
      res.json(blogs);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve blogs' });
    }
  });

  router.get('/api/blogs/:id', async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
      res.json(blog);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });

  router.patch('/api/blogs/unpublish/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const blog = await Blog.findById(id);
      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
      blog.publish = false; // Set published to false
      await blog.save();
      res.status(200).json({ message: 'Blog unpublished successfully', blog });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  router.patch('/api/blogs/publish/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const blog = await Blog.findById(id);
      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
      blog.publish = true; // Set published to false
      await blog.save();
      res.status(200).json({ message: 'Blog Published successfully', blog });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  router.delete('/api/blogs/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await Blog.findByIdAndDelete(id);
  
      if (!result) {
        return res.status(404).json({ message: 'Blog not found' });
      }
  
      res.status(200).json({ message: 'Blog deleted successfully', blog: result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

router.put('/updateComplaint/:id', async (req, res) => {
    const { id } = req.params;
    const { field, value } = req.body;
    console.log(req.body);
  
    try {
      const updatedComplaint = await Grievances.findByIdAndUpdate(id, { [field]: value }, { new: true });
      res.json(updatedComplaint);
    } catch (error) {
      res.status(500).json({ message: 'Error updating complaint' });
    }
  });

  router.post('/updates', async (req, res) => {
    const { statement, pdfLink, externalLink, publish } = req.body;
    console.log(req.body);
    // if( !name || !email || !phone || !occupation || !password || !cpassword ){
    //     return res.status(400).json({ error: "Please fill all the fields" });
    // }
    try{
        const updates = new Updates({ statement, pdfLink, externalLink, publish });
        await updates.save();
        res.status(200).json({ message: "Successfully publish an update"});
    } catch (err) { 
        console.log(err);
    }
});

router.get('/api/updates', async (req, res) => {
  try {
    const updates = await Updates.find({ publish: true }); // Fetch only published updates
    res.json(updates);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve updates' });
  }
});

router.get('/api/updates/unpublish', async (req, res) => {
  try {
    const updates = await Updates.find({ publish: false }); // Fetch only published updates
    res.json(updates);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve updates' });
  }
});

router.delete('/api/updates/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    console.log(id);
    const result = await Updates.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: 'Update not found' });
    }
    res.status(200).json({ message: 'Update deleted successfully', blog: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


router.put('/editUpdates/:id', async (req, res) => {
  const { id } = req.params;
  const { field, value } = req.body;
  console.log(req.body);
  try {
    // Convert string 'true'/'false' to boolean true/false
    const parsedValue = (field === 'status') ? (value === 'true') : value;
    const editUpdates = await Updates.findByIdAndUpdate(id, { [field]: parsedValue }, { new: true });
    if (!editUpdates) {
      return res.status(404).json({ message: 'Updates Data not found' });
    }
    res.json(editUpdates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating Data' });
  }
});


router.get('/api/count', async (req, res) => {
  try {
      const count = await collection.countDocuments();
      res.json({ count });
  } catch (error) {
      console.error('Error counting documents:', error);
      res.status(500).json({ error: 'Error counting documents' });
  } finally {
      await client.close();
  }
});


router.get('/', async (req, res) => {
  try {
      const ads = await Advertisement.find();
      res.json(ads);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});


module.exports = router;