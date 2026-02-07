import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import default Quill styles
// import 'quill-table-module/dist/quill-table.css'; // Import table module styles
import '../css/blog.css';
import axios from 'axios'; // Import axios

// Import Quill and the table module
import Quill from 'quill';
import { TableModule } from 'quill-table-module';

// Register the table module with Quill
Quill.register('modules/table', TableModule);

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [publish, setPublish] = useState(false);
  const [image, setImage] = useState(null); // State for the image file

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Set the selected image file
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('subtitle', subtitle);
    formData.append('content', content);
    formData.append('tags', tags);
    formData.append('publish', publish);
    if (image) {
      formData.append('image', image); // Append the image file
    }

    try {
      await axios.post('https://serve-d3eo.onrender.com/api/blog', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
        },
      });
      alert('Blog saved successfully!');

      setTitle('');
      setSubtitle('');
      setContent('');
      setTags('');
      setPublish(false);
      setImage(null);
    } catch (error) {
      console.error('Error saving blog:', error);
      alert('Failed to save blog');
    }
  };

  return (
    <main className="main-content mt-0 myangleStyle">
      <div className="page-header align-items-start min-vh-100">
        <span className="mask bg-gradient-dark opacity-6"></span>
        <div className="container my-auto">
          <div className="row">
            <div className="col-lg-8 col-md-10 col-12 mx-auto">
              <div className="card z-index-0 fadeIn3 fadeInBottom">
                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                  <div className="create-blog-bg shadow-primary border-radius-lg py-3 pe-1">
                    <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">Create Blog</h4>
                  </div>
                </div>
                <div className="card-body">
                  <form role="form" className="text-start" onSubmit={handleSubmit}>
                    <div className="input-group input-group-outline my-3">
                      <input 
                        type="text" 
                        className="form-control" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        placeholder="Enter blog title" 
                      />
                    </div>
                    <div className="input-group input-group-outline my-3">
                      <input 
                        type="text" 
                        className="form-control" 
                        value={subtitle} 
                        onChange={(e) => setSubtitle(e.target.value)} 
                        placeholder="Enter blog subtitle" 
                      />
                    </div>
                    <div className="my-3">
                      <ReactQuill 
                        value={content} 
                        onChange={setContent} 
                        modules={CreateBlog.modules} 
                        formats={CreateBlog.formats} 
                        placeholder="Write your blog content here" 
                      />
                    </div>
                    <div className="input-group input-group-outline my-3">
                      <input 
                        type="text" 
                        className="form-control" 
                        value={tags} 
                        onChange={(e) => setTags(e.target.value)} 
                        placeholder="Enter tags separated by commas" 
                      />
                    </div>
                    <div className="my-3">
                      <input 
                        type="file" 
                        className="form-control" 
                        onChange={handleImageChange} 
                      />
                    </div>
                    <div className="form-check form-switch d-flex align-items-center mb-3">
                      <input 
                        className="form-check-input" 
                        type="checkbox" 
                        id="publish" 
                        checked={publish} 
                        onChange={() => setPublish(!publish)} 
                      />
                      <label className="form-check-label mb-0 ms-3" htmlFor="publish">Publish</label>
                    </div>
                    <div className="text-center">
                      <button type="submit" className="create-blog-bg btn w-100 my-4 mb-2">Publish</button>
                    </div>
                    <p className="mt-4 text-sm text-center">
                      <a href="#" className="text-primary text-gradient font-weight-bold">Go back to dashboard</a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

CreateBlog.modules = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['bold', 'italic', 'underline'],
    [{ 'align': [] }],
    ['link', 'image', 'table'],
  ],
};

CreateBlog.formats = [
  'header', 'list', 'bullet', 'bold', 'italic', 'underline', 'align', 'link', 'image', 'table'
];

export default CreateBlog;
