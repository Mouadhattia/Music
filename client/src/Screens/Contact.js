import React from "react";
import { useParams } from "react-router";

const Contact = () => {
  const params = useParams();
  const { id } = params;

  return (
    <div id="main" className="layout-row flex">
      {/* ############ Content START*/}
      <div id="content" className="flex">
        {/* ############ Main START*/}
        <div className="sr">
          <div className="page-hero page-container">
            <div className="media bg-media bg-primary">
              <div
                className="media-content"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1598653222000-6b7b7a552625?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bXVzaWMlMjBzdHVkaW98ZW58MHx8MHx8&w=1000&q=80)",
                }}
              />
            </div>
            <div className="p-5 pos-rlt text-center">
              <h1 className="display-4 font-weight-bold text-white m-5">
                Contactez Nous
              </h1>
            </div>
          </div>
          <div className="col-md-12">
            <center>
              <div className="mapouter">
                <div className="gmap_canvas">
                  <iframe
                    width={1400}
                    height={400}
                    id="gmap_canvas"
                    src="https://maps.google.com/maps?q=66%20avenue%20des%20champ%20ely&t=&z=11&ie=UTF8&iwloc=&output=embed"
                    frameBorder={0}
                    scrolling="no"
                    marginHeight={0}
                    marginWidth={0}
                  />
                  <a href="https://putlocker-is.org" />
                  <br />
                  <style
                    dangerouslySetInnerHTML={{
                      __html:
                        ".mapouter{position:relative;text-align:right;height:400px;width:1000px;}",
                    }}
                  />
                  <a href="https://www.embedgooglemap.net">map embed code</a>
                  <style
                    dangerouslySetInnerHTML={{
                      __html:
                        ".gmap_canvas {overflow:hidden;background:none!important;height:400px;width:1000px;}",
                    }}
                  />
                </div>
              </div>
            </center>
          </div>
          <div className="page-container pos-rlt padding">
            <div className="row row-lg">
              <div className="col-md-6">
                <div className="py-5 sr-item">
                  <h4 className="mb-5">SAS FastDream</h4>
                  <p>66 Avenue les Champs Elysées </p>
                  <h4 className="mb-5">01 342424 252 62</h4>
                  <h4>contact@fastdream.fr</h4>
                </div>
              </div>
              <div className="col-md-6">
                <div className="py-5 sr-item">
                  <h4 className="mb-5">Ecrivez Nous</h4>
                  <input
                    type=""
                    className="form-control"
                    name=""
                    placeholder="Nom et Prénom"
                  />
                  <br />
                  <input
                    type=""
                    className="form-control"
                    name=""
                    placeholder="Email"
                  />
                  <br />
                  <input
                    type=""
                    className="form-control"
                    name=""
                    placeholder="Téléphone"
                  />
                  <br />
                  <textarea
                    className="form-control"
                    col={50}
                    defaultValue={""}
                  />
                  <br />
                  <button className="btn-primary">Envoyer</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ############ Main END*/}
      </div>
      {/* ############ Content END*/}
    </div>
  );
};

export default Contact;
