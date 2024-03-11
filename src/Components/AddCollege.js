import React from 'react'


export default function AddCollege() {
  return (
    <>
   <section className="content">
  <div className="block-header">
    <div className="row">
      <div className="col-lg-5 col-md-5 col-sm-12">
        <h2>Add College
          <small>Welcome to Admission Kart</small>
        </h2>
      </div>            
      <div className="col-lg-7 col-md-7 col-sm-12 text-md-right">
        <div className="inlineblock text-center m-r-15 m-l-15 hidden-md-down">

        </div>
        <div className="inlineblock text-center m-r-15 m-l-15 hidden-md-down">
        </div>
        <button className="btn btn-white btn-icon btn-round hidden-sm-down float-right ml-3" type="button">
          <i className="zmdi zmdi-plus" />
        </button>
        <ul className="breadcrumb float-md-right">
          <li className="breadcrumb-item"><a href="index.html"><i className="zmdi zmdi-home" /> Admission Kart</a></li>
          <li className="breadcrumb-item active">Property</li>
        </ul>
      </div>
    </div>
  </div>
  <div className="container-fluid">
    <div className="row clearfix">
      <div className="col-lg-12">
        <div className="card">
          <div className="header">
            <h2><strong>Basic</strong> Information <small>Description text here...</small> </h2>
            <ul className="header-dropdown m-r--5">
              <li className="dropdown"> <a href="javascript:void(0);" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i className="zmdi zmdi-more-vert" /></a>
                <ul className="dropdown-menu pull-right">
                  <li><a href="javascript:void(0);" className=" waves-effect waves-block">Action</a></li>
                  <li><a href="javascript:void(0);" className=" waves-effect waves-block">Another action</a></li>
                  <li><a href="javascript:void(0);" className=" waves-effect waves-block">Something else here</a></li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="body">
            <div className="row clearfix">
              <div className="col-sm-6">
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Property Name" />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Property Location" />
                </div>
              </div>
              <div className="col-sm-12">
                <div className="form-group">
                  <div className="form-line">
                    <textarea rows={4} className="form-control no-resize" placeholder="Property Description" defaultValue={""} />
                  </div>
                </div>
              </div>
            </div>
            <h6 className="mt-4">Property Information</h6>
            <div className="row clearfix">
              <div className="col-sm-6">
                <div className="radio inlineblock m-r-25">
                  <input type="radio" name="radio1" id="radio1" defaultValue="option1" defaultChecked />
                  <label htmlFor="radio1">For Rent</label>
                </div>
                <div className="radio inlineblock">
                  <input type="radio" name="radio1" id="radio2" defaultValue="option2" />
                  <label htmlFor="radio2">For Sale</label>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Price / Rent" />
                </div>
              </div>                            
              <div className="col-lg-3 col-md-3 col-sm-6">
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Bedrooms" />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6">
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Square ft" />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6">
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Car Parking" />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6">
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Year Built" />
                </div>
              </div>
              <div className="col-sm-12">
                <div className="form-group">
                  <textarea rows={4} className="form-control no-resize" placeholder="Property Address" defaultValue={""} />
                </div>
              </div>
            </div>
            <h6 className="mt-4">Dimensions</h6>
            <div className="row">
              <div className="col-lg-2 col-md-4 col-sm-6">
                <div className="form-line">
                  <input type="text" className="form-control" placeholder="Dining Room" />
                </div>
              </div>
              <div className="col-lg-2 col-md-4 col-sm-6">
                <div className="form-line">
                  <input type="text" className="form-control" placeholder="Kitchen" />
                </div>
              </div>
              <div className="col-lg-2 col-md-4 col-sm-6">
                <div className="form-line">
                  <input type="text" className="form-control" placeholder="Living Room" />
                </div>
              </div>
              <div className="col-lg-2 col-md-4 col-sm-6">
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Master Bedroom" />
                </div>
              </div>
              <div className="col-lg-2 col-md-4 col-sm-6">
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Bedroom 2" />
                </div>
              </div>
              <div className="col-lg-2 col-md-4 col-sm-6">
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Other Room" />
                </div>
              </div>
            </div>
            <h6 className="mt-4">General Amenities</h6>
            <div className="row">
              <div className="col-sm-12">
                <div className="checkbox inlineblock m-r-20">
                  <input id="checkbox21" type="checkbox" />
                  <label htmlFor="checkbox21">Swimming pool</label>
                </div>
                <div className="checkbox inlineblock m-r-20">
                  <input id="checkbox22" type="checkbox" />
                  <label htmlFor="checkbox22">Terrace</label>
                </div>
                <div className="checkbox inlineblock m-r-20">
                  <input id="checkbox23" type="checkbox" defaultChecked />
                  <label htmlFor="checkbox23">Air conditioning</label>
                </div>
                <div className="checkbox inlineblock m-r-20">
                  <input id="checkbox24" type="checkbox" defaultChecked />
                  <label htmlFor="checkbox24">Internet</label>
                </div>
                <div className="checkbox inlineblock m-r-20">
                  <input id="checkbox25" type="checkbox" />
                  <label htmlFor="checkbox25">Balcony</label>
                </div>
                <div className="checkbox inlineblock m-r-20">
                  <input id="checkbox26" type="checkbox" />
                  <label htmlFor="checkbox26">Cable TV</label>
                </div>
                <div className="checkbox inlineblock m-r-20">
                  <input id="checkbox27" type="checkbox" />
                  <label htmlFor="checkbox27">Computer</label>
                </div>
                <div className="checkbox inlineblock m-r-20">
                  <input id="checkbox28" type="checkbox" defaultChecked />
                  <label htmlFor="checkbox28">Dishwasher</label>
                </div>
                <div className="checkbox inlineblock m-r-20">
                  <input id="checkbox29" type="checkbox" defaultChecked />
                  <label htmlFor="checkbox29">Near Green Zone</label>
                </div>
                <div className="checkbox inlineblock m-r-20">
                  <input id="checkbox30" type="checkbox" />
                  <label htmlFor="checkbox30">Near Church</label>
                </div>
                <div className="checkbox inlineblock m-r-20">
                  <input id="checkbox31" type="checkbox" />
                  <label htmlFor="checkbox31">Near Estate</label>
                </div>
                <div className="checkbox inlineblock m-r-20">
                  <input id="checkbox32" type="checkbox" />
                  <label htmlFor="checkbox32">Cofee pot</label>
                </div>
              </div>
            </div>
            <div className="row clearfix">
              <div className="col-sm-12">
                {/* <form action="https://thememakker.com/" id="frmFileUpload" className="dropzone m-b-15 m-t-15" method="post" encType="multipart/form-data">
                  <div className="dz-message">
                    <div className="drag-icon-cph"> <i className="material-icons">touch_app</i> </div>
                    <h3>Drop files here or click to upload.</h3>
                    <em>(This is just a demo dropzone. Selected files are <strong>not</strong> actually uploaded.)</em> </div>
                  <div className="fallback">
                    <input name="file" type="file" multiple />
                  </div>
                </form> */}
              </div>
              <div className="col-sm-12 py-3 ">
                <button type="submit" className="btn btn-primary btn-round ">Submit</button>
                <button type="submit" className="btn btn-default btn-round btn-simple">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


    </>
  )
}
