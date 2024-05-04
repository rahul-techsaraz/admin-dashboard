import React from 'react'

export default function CollegeList() {
  return (
    <>
<section className="content">
  <div className="block-header">
    <div className="row">
      <div className="col-lg-5 col-md-5 col-sm-12">
        <h2>Property List
          <small>Welcome to Oreo</small>
        </h2>
      </div>            
      <div className="col-lg-7 col-md-7 col-sm-12 text-md-right">
        <div className="inlineblock text-center m-r-15 m-l-15 hidden-md-down">
          <div className="sparkline" data-type="bar" data-width="97%" data-height="25px" data-bar-width={2} data-bar-spacing={5} data-bar-color="#fff">3,2,6,5,9,8,7,9,5,1,3,5,7,4,6</div>
          <small className="col-white">Visitors</small>
        </div>
        <div className="inlineblock text-center m-r-15 m-l-15 hidden-md-down">
          <div className="sparkline" data-type="bar" data-width="97%" data-height="25px" data-bar-width={2} data-bar-spacing={5} data-bar-color="#fff">1,3,5,7,4,6,3,2,6,5,9,8,7,9,5</div>
          <small className="col-white">Bounce Rate</small>
        </div>
        <button className="btn btn-white btn-icon btn-round hidden-sm-down float-right ml-3" type="button">
          <i className="zmdi zmdi-plus" />
        </button>
        <ul className="breadcrumb float-md-right">
          <li className="breadcrumb-item"><a href="index.html"><i className="zmdi zmdi-home" /> Oreo</a></li>
          <li className="breadcrumb-item active">Property</li>
        </ul>
      </div>
    </div>
  </div>
  <div className="container-fluid">
    <div className="row clearfix">
      <div className="col-lg-12">
        <div className="card">                   
          <div className="body">
            <div className="table-responsive">
              <table className="table td_2 table-striped table-hover js-basic-example dataTable">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Property</th>
                    <th>Address</th>
                    <th>Beds</th>
                    <th>sq. ft</th>
                    <th>Agent</th>
                    <th>Sale/Rent</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Beautiful home for sale</td>
                    <td>Chicago</td>
                    <td>4 BHK</td>
                    <td>2,000 ft2</td>
                    <td>Maria Barlow</td>
                    <td><span className="badge badge-primary mb-0">Sale</span></td>
                    <td>$320,800</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Luxury Apartment</td>
                    <td>chelsea</td>
                    <td>3 BHK</td>
                    <td>1,320 ft2</td>
                    <td>Maria Barlow</td>
                    <td><span className="badge badge-success mb-0">Rent</span></td>
                    <td>$2,800</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Beautiful home for sale</td>
                    <td>Chicago</td>
                    <td>4 BHK</td>
                    <td>2,000 ft2</td>
                    <td>Maria Barlow</td>
                    <td><span className="badge badge-primary mb-0">Sale</span></td>
                    <td>$30,800</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Beautiful home for sale</td>
                    <td>Chicago</td>
                    <td>4 BHK</td>
                    <td>2,000 ft2</td>
                    <td>Maria Barlow</td>
                    <td><span className="badge badge-primary mb-0">Sale</span></td>
                    <td>$320,800</td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>Luxury Apartment</td>
                    <td>chelsea</td>
                    <td>3 BHK</td>
                    <td>1,320 ft2</td>
                    <td>Eliana Smith</td>
                    <td><span className="badge badge-success mb-0">Rent</span></td>
                    <td>$2,800</td>
                  </tr>
                  <tr>
                    <td>6</td>
                    <td>Beautiful home for sale</td>
                    <td>Chicago</td>
                    <td>4 BHK</td>
                    <td>2,000 ft2</td>
                    <td>Maria Barlow</td>
                    <td><span className="badge badge-primary mb-0">Sale</span></td>
                    <td>$30,800</td>
                  </tr>
                  <tr>
                    <td>7</td>
                    <td>Beautiful home for sale</td>
                    <td>Austin</td>
                    <td>4 BHK</td>
                    <td>2,000 ft2</td>
                    <td>Eliana Smith</td>
                    <td><span className="badge badge-primary mb-0">Sale</span></td>
                    <td>$25,800</td>
                  </tr>
                  <tr>
                    <td>8</td>
                    <td>Luxury Apartment</td>
                    <td>chelsea</td>
                    <td>3 BHK</td>
                    <td>1,320 ft2</td>
                    <td>Matthew Deo</td>
                    <td><span className="badge badge-success mb-0">Rent</span></td>
                    <td>$2,800</td>
                  </tr>
                  <tr>
                    <td>9</td>
                    <td>Beautiful home for sale</td>
                    <td>Texas</td>
                    <td>4 BHK</td>
                    <td>2,000 ft2</td>
                    <td>Matthew Deo</td>
                    <td><span className="badge badge-success mb-0">Rent</span></td>
                    <td>$15,025</td>
                  </tr>
                  <tr>
                    <td>10</td>
                    <td>Beautiful home for sale</td>
                    <td>Chicago</td>
                    <td>4 BHK</td>
                    <td>2,000 ft2</td>
                    <td>Maria Barlow</td>
                    <td><span className="badge badge-success mb-0">Rent</span></td>
                    <td>$35,251</td>
                  </tr>
                  <tr>
                    <td>11</td>
                    <td>Luxury Apartment</td>
                    <td>Florida</td>
                    <td>3 BHK</td>
                    <td>1,320 ft2</td>
                    <td>Maria Barlow</td>
                    <td><span className="badge badge-success mb-0">Rent</span></td>
                    <td>$2,800</td>
                  </tr>
                  <tr>
                    <td>12</td>
                    <td>Beautiful home for sale</td>
                    <td>Pioneers park</td>
                    <td>4 BHK</td>
                    <td>2,000 ft2</td>
                    <td>Maria Barlow</td>
                    <td><span className="badge badge-primary mb-0">Sale</span></td>
                    <td>$30,800</td>
                  </tr>
                </tbody>
              </table>
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
