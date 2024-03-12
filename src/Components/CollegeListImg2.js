import React from 'react'
import collegeImg1 from "../assets/images/image-gallery/1.jpg";
import collegeImg2 from "../assets/images/image-gallery/2.jpg";
import collegeImg3 from "../assets/images/image-gallery/3.jpg";
import collegeImg4 from "../assets/images/image-gallery/4.jpg";
import collegeImg5 from "../assets/images/image-gallery/5.jpg";
import collegeImg6 from "../assets/images/image-gallery/6.jpg";

export default function CollegeListImg2() {
  return (
    <>
      <section className="content">
  <div className="block-header">
    <div className="row">
      <div className="col-lg-5 col-md-5 col-sm-12">
        <h2>College view
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
          <li className="breadcrumb-item active">College</li>
        </ul>
      </div>
    </div>
  </div>
  <div className="container-fluid">
    <div className="row clearfix">
      <div className="col-lg-12">
        <div className="card action_bar">
          <div className="body">
            <div className="row clearfix">
              <div className="col-lg-1 col-md-1 col-3">
                <div className="checkbox inlineblock delete_all mb-0">
                  <input id="deleteall" type="checkbox" />
                  <label htmlFor="deleteall">All</label>
                </div>                                
              </div>
              <div className="col-lg-5 col-md-5 col-9">
                <div className="input-group search mb-0">
                  <input type="text" className="form-control" placeholder="Search..." />
                  <span className="input-group-addon">
                    <i className="zmdi zmdi-search" />
                  </span>
                </div>
              </div>                                                        
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-md-6">
        <div className="card">
          <div className="body">
            <img className="img-thumbnail img-fluid" src={collegeImg1} alt="img" />
            <h6 className="text-success mt-3">$390,000 - $430,000</h6>
            <h5 className="mt-0"><a href="#" className="col-blue-grey">4BHK Alexander Court,New York</a></h5>
            <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit Aliquam gravida magna et fringilla convallis. Pellentesque habitant morb</p>
            <small className="text-muted"><i className="zmdi zmdi-pin mr-2" />245 E 20th St, New York, NY 201609</small>
            <div className="d-flex justify-content-between mt-3 p-3 bg-light">
              <a href="#" title="Square Feet"><i className="zmdi zmdi-view-dashboard mr-2" /><span>280</span></a>
              <a href="#" title="Bedroom"><i className="zmdi zmdi-hotel mr-2" /><span>4</span></a>
              <a href="#" title="Parking space"><i className="zmdi zmdi-car-taxi mr-2" /><span>2</span></a>
              <a href="#" title="Garages"><i className="zmdi zmdi-home mr-2" /><span> 24H</span></a>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-md-6">
        <div className="card">
          <div className="body">
            <img className="img-thumbnail img-fluid" src={collegeImg2} alt="img" />
            <h6 className="text-success mt-3">$390,000 - $430,000</h6>
            <h5 className="mt-0"><a href="#" className="col-blue-grey">4BHK Alexander Court,New York</a></h5>
            <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit Aliquam gravida magna et fringilla convallis. Pellentesque habitant morb</p>
            <small className="text-muted"><i className="zmdi zmdi-pin mr-2" />245 E 20th St, New York, NY 201609</small>
            <div className="d-flex justify-content-between mt-3 p-3 bg-light">
              <a href="#" title="Square Feet"><i className="zmdi zmdi-view-dashboard mr-2" /><span>280</span></a>
              <a href="#" title="Bedroom"><i className="zmdi zmdi-hotel mr-2" /><span>4</span></a>
              <a href="#" title="Parking space"><i className="zmdi zmdi-car-taxi mr-2" /><span>2</span></a>
              <a href="#" title="Garages"><i className="zmdi zmdi-home mr-2" /><span> 24H</span></a>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-md-6">
        <div className="card">
          <div className="body">
            <img className="img-thumbnail img-fluid" src={collegeImg3} alt="img" />
            <h6 className="text-success mt-3">$390,000 - $430,000</h6>
            <h5 className="mt-0"><a href="#" className="col-blue-grey">4BHK Alexander Court,New York</a></h5>
            <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit Aliquam gravida magna et fringilla convallis. Pellentesque habitant morb</p>
            <small className="text-muted"><i className="zmdi zmdi-pin mr-2" />245 E 20th St, New York, NY 201609</small>
            <div className="d-flex justify-content-between mt-3 p-3 bg-light">
              <a href="#" title="Square Feet"><i className="zmdi zmdi-view-dashboard mr-2" /><span>280</span></a>
              <a href="#" title="Bedroom"><i className="zmdi zmdi-hotel mr-2" /><span>4</span></a>
              <a href="#" title="Parking space"><i className="zmdi zmdi-car-taxi mr-2" /><span>2</span></a>
              <a href="#" title="Garages"><i className="zmdi zmdi-home mr-2" /><span> 24H</span></a>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-md-6">
        <div className="card">
          <div className="body">
            <img className="img-thumbnail img-fluid" src={collegeImg4} alt="img" />
            <h6 className="text-success mt-3">$390,000 - $430,000</h6>
            <h5 className="mt-0"><a href="#" className="col-blue-grey">4BHK Alexander Court,New York</a></h5>
            <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit Aliquam gravida magna et fringilla convallis. Pellentesque habitant morb</p>
            <small className="text-muted"><i className="zmdi zmdi-pin mr-2" />245 E 20th St, New York, NY 201609</small>
            <div className="d-flex justify-content-between mt-3 p-3 bg-light">
              <a href="#" title="Square Feet"><i className="zmdi zmdi-view-dashboard mr-2" /><span>280</span></a>
              <a href="#" title="Bedroom"><i className="zmdi zmdi-hotel mr-2" /><span>4</span></a>
              <a href="#" title="Parking space"><i className="zmdi zmdi-car-taxi mr-2" /><span>2</span></a>
              <a href="#" title="Garages"><i className="zmdi zmdi-home mr-2" /><span> 24H</span></a>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-md-6">
        <div className="card">
          <div className="body">
            <img className="img-thumbnail img-fluid" src={collegeImg5} alt="img" />
            <h6 className="text-success mt-3">$390,000 - $430,000</h6>
            <h5 className="mt-0"><a href="#" className="col-blue-grey">4BHK Alexander Court,New York</a></h5>
            <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit Aliquam gravida magna et fringilla convallis. Pellentesque habitant morb</p>
            <small className="text-muted"><i className="zmdi zmdi-pin mr-2" />245 E 20th St, New York, NY 201609</small>
            <div className="d-flex justify-content-between mt-3 p-3 bg-light">
              <a href="#" title="Square Feet"><i className="zmdi zmdi-view-dashboard mr-2" /><span>280</span></a>
              <a href="#" title="Bedroom"><i className="zmdi zmdi-hotel mr-2" /><span>4</span></a>
              <a href="#" title="Parking space"><i className="zmdi zmdi-car-taxi mr-2" /><span>2</span></a>
              <a href="#" title="Garages"><i className="zmdi zmdi-home mr-2" /><span> 24H</span></a>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-md-6">
        <div className="card">
          <div className="body">
            <img className="img-thumbnail img-fluid" src={collegeImg6} alt="img" />
            <h6 className="text-success mt-3">$390,000 - $430,000</h6>
            <h5 className="mt-0"><a href="#" className="col-blue-grey">4BHK Alexander Court,New York</a></h5>
            <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit Aliquam gravida magna et fringilla convallis. Pellentesque habitant morb</p>
            <small className="text-muted"><i className="zmdi zmdi-pin mr-2" />245 E 20th St, New York, NY 201609</small>
            <div className="d-flex justify-content-between mt-3 p-3 bg-light">
              <a href="#" title="Square Feet"><i className="zmdi zmdi-view-dashboard mr-2" /><span>280</span></a>
              <a href="#" title="Bedroom"><i className="zmdi zmdi-hotel mr-2" /><span>4</span></a>
              <a href="#" title="Parking space"><i className="zmdi zmdi-car-taxi mr-2" /><span>2</span></a>
              <a href="#" title="Garages"><i className="zmdi zmdi-home mr-2" /><span> 24H</span></a>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-md-6">
        <div className="card">
          <div className="body">
            <img className="img-thumbnail img-fluid" src={collegeImg1} alt="img" />
            <h6 className="text-success mt-3">$390,000 - $430,000</h6>
            <h5 className="mt-0"><a href="#" className="col-blue-grey">4BHK Alexander Court,New York</a></h5>
            <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit Aliquam gravida magna et fringilla convallis. Pellentesque habitant morb</p>
            <small className="text-muted"><i className="zmdi zmdi-pin mr-2" />245 E 20th St, New York, NY 201609</small>
            <div className="d-flex justify-content-between mt-3 p-3 bg-light">
              <a href="#" title="Square Feet"><i className="zmdi zmdi-view-dashboard mr-2" /><span>280</span></a>
              <a href="#" title="Bedroom"><i className="zmdi zmdi-hotel mr-2" /><span>4</span></a>
              <a href="#" title="Parking space"><i className="zmdi zmdi-car-taxi mr-2" /><span>2</span></a>
              <a href="#" title="Garages"><i className="zmdi zmdi-home mr-2" /><span> 24H</span></a>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-md-6">
        <div className="card">
          <div className="body">
            <img className="img-thumbnail img-fluid" src={collegeImg2} alt="img" />
            <h6 className="text-success mt-3">$390,000 - $430,000</h6>
            <h5 className="mt-0"><a href="#" className="col-blue-grey">4BHK Alexander Court,New York</a></h5>
            <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit Aliquam gravida magna et fringilla convallis. Pellentesque habitant morb</p>
            <small className="text-muted"><i className="zmdi zmdi-pin mr-2" />245 E 20th St, New York, NY 201609</small>
            <div className="d-flex justify-content-between mt-3 p-3 bg-light">
              <a href="#" title="Square Feet"><i className="zmdi zmdi-view-dashboard mr-2" /><span>280</span></a>
              <a href="#" title="Bedroom"><i className="zmdi zmdi-hotel mr-2" /><span>4</span></a>
              <a href="#" title="Parking space"><i className="zmdi zmdi-car-taxi mr-2" /><span>2</span></a>
              <a href="#" title="Garages"><i className="zmdi zmdi-home mr-2" /><span> 24H</span></a>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-md-6">
        <div className="card">
          <div className="body">
            <img className="img-thumbnail img-fluid" src={collegeImg3} alt="img" />
            <h6 className="text-success mt-3">$390,000 - $430,000</h6>
            <h5 className="mt-0"><a href="#" className="col-blue-grey">4BHK Alexander Court,New York</a></h5>
            <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit Aliquam gravida magna et fringilla convallis. Pellentesque habitant morb</p>
            <small className="text-muted"><i className="zmdi zmdi-pin mr-2" />245 E 20th St, New York, NY 201609</small>
            <div className="d-flex justify-content-between mt-3 p-3 bg-light">
              <a href="#" title="Square Feet"><i className="zmdi zmdi-view-dashboard mr-2" /><span>280</span></a>
              <a href="#" title="Bedroom"><i className="zmdi zmdi-hotel mr-2" /><span>4</span></a>
              <a href="#" title="Parking space"><i className="zmdi zmdi-car-taxi mr-2" /><span>2</span></a>
              <a href="#" title="Garages"><i className="zmdi zmdi-home mr-2" /><span> 24H</span></a>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-md-6">
        <div className="card">
          <div className="body">
            <img className="img-thumbnail img-fluid" src={collegeImg4} alt="img" />
            <h6 className="text-success mt-3">$390,000 - $430,000</h6>
            <h5 className="mt-0"><a href="#" className="col-blue-grey">4BHK Alexander Court,New York</a></h5>
            <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit Aliquam gravida magna et fringilla convallis. Pellentesque habitant morb</p>
            <small className="text-muted"><i className="zmdi zmdi-pin mr-2" />245 E 20th St, New York, NY 201609</small>
            <div className="d-flex justify-content-between mt-3 p-3 bg-light">
              <a href="#" title="Square Feet"><i className="zmdi zmdi-view-dashboard mr-2" /><span>280</span></a>
              <a href="#" title="Bedroom"><i className="zmdi zmdi-hotel mr-2" /><span>4</span></a>
              <a href="#" title="Parking space"><i className="zmdi zmdi-car-taxi mr-2" /><span>2</span></a>
              <a href="#" title="Garages"><i className="zmdi zmdi-home mr-2" /><span> 24H</span></a>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-md-6">
        <div className="card">
          <div className="body">
            <img className="img-thumbnail img-fluid" src={collegeImg5} alt="img" />
            <h6 className="text-success mt-3">$390,000 - $430,000</h6>
            <h5 className="mt-0"><a href="#" className="col-blue-grey">4BHK Alexander Court,New York</a></h5>
            <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit Aliquam gravida magna et fringilla convallis. Pellentesque habitant morb</p>
            <small className="text-muted"><i className="zmdi zmdi-pin mr-2" />245 E 20th St, New York, NY 201609</small>
            <div className="d-flex justify-content-between mt-3 p-3 bg-light">
              <a href="#" title="Square Feet"><i className="zmdi zmdi-view-dashboard mr-2" /><span>280</span></a>
              <a href="#" title="Bedroom"><i className="zmdi zmdi-hotel mr-2" /><span>4</span></a>
              <a href="#" title="Parking space"><i className="zmdi zmdi-car-taxi mr-2" /><span>2</span></a>
              <a href="#" title="Garages"><i className="zmdi zmdi-home mr-2" /><span> 24H</span></a>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-md-6">
        <div className="card">
          <div className="body">
            <img className="img-thumbnail img-fluid" src={collegeImg6} alt="img" />
            <h6 className="text-success mt-3">$390,000 - $430,000</h6>
            <h5 className="mt-0"><a href="#" className="col-blue-grey">4BHK Alexander Court,New York</a></h5>
            <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit Aliquam gravida magna et fringilla convallis. Pellentesque habitant morb</p>
            <small className="text-muted"><i className="zmdi zmdi-pin mr-2" />245 E 20th St, New York, NY 201609</small>
            <div className="d-flex justify-content-between mt-3 p-3 bg-light">
              <a href="#" title="Square Feet"><i className="zmdi zmdi-view-dashboard mr-2" /><span>280</span></a>
              <a href="#" title="Bedroom"><i className="zmdi zmdi-hotel mr-2" /><span>4</span></a>
              <a href="#" title="Parking space"><i className="zmdi zmdi-car-taxi mr-2" /><span>2</span></a>
              <a href="#" title="Garages"><i className="zmdi zmdi-home mr-2" /><span> 24H</span></a>
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
