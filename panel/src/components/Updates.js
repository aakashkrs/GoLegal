import React, { useState } from 'react';
import '../css/updates.css';

const LatestUpdates = () => {
  const [statement, setStatement] = useState('');
  const [pdfLink, setPdfLink] = useState('');
  const [externalLink, setExternalLink] = useState('');
  const [publish, setPublish] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!statement.trim()) {
      alert('Statement is required');
      return;
    }


    try {
      const response = await fetch('https://serve-d3eo.onrender.com/updates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          statement,
          pdfLink: pdfLink.trim() || undefined, // Only include if not empty
          externalLink: externalLink.trim() || undefined, // Only include if not empty
          publish,
        }),
      });

      if (response.ok) {
        alert('Update saved successfully!');
        const data = await response.json();
        console.log('Success:', data);
        setStatement('');
        setPdfLink('');
        setExternalLink('');
        setPublish(false);
      } else {
        console.error('Error:', response.statusText);
        alert('Error:',response.statusText);
        // Optionally, handle errors (e.g., show an error message)
      }
    } catch (error) {
      console.error('Network Error:', error);
      // Optionally, handle network errors
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
                  <div className="bg-gradient-primary create-blog-bg shadow-primary border-radius-lg py-3 pe-1">
                    <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">Latest Updates</h4>
                  </div>
                </div>
                <div className="card-body">
                  <form role="form" className="text-start" onSubmit={handleSubmit}>
                    <div className="input-group input-group-outline my-3">
                      <textarea
                        className="form-control"
                        value={statement}
                        onChange={(e) => setStatement(e.target.value)}
                        placeholder="Enter update statement here"
                        rows="4"
                      ></textarea>
                    </div>
                    <div className="input-group input-group-outline my-3">
                      <input
                        type="text"
                        className="form-control"
                        value={pdfLink}
                        onChange={(e) => setPdfLink(e.target.value)}
                        placeholder="Enter PDF link (optional)"
                      />
                    </div>
                    <div className="input-group input-group-outline my-3">
                      <input
                        type="text"
                        className="form-control"
                        value={externalLink}
                        onChange={(e) => setExternalLink(e.target.value)}
                        placeholder="Enter external link (optional)"
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
                      <button type="submit" className="create-blog-bg btn w-100 my-4 mb-2">Submit Update</button>
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

export default LatestUpdates;
