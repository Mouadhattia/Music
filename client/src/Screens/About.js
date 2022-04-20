import React from "react";

const About = () => {
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
                style={{ backgroundImage: "url(../assets/img/b20.jpg)" }}
              />
            </div>
            <div className="p-5 pos-rlt text-center">
              <h1 className="display-4 font-weight-bold text-white m-5">
                La 1ère plateforme au monde mise en relation artistes / maisons
                de disques / marques
              </h1>
            </div>
          </div>
          <div className="page-container pos-rlt padding">
            <div className="row row-lg">
              <div className="col-md-6">
                <div className="py-5 sr-item">
                  <h4 className="mb-5">Non-stop player</h4>
                  <p className="text-muted">
                    Votre clip financé par ses grande marques c’est désormais
                    possible avec Deal Day
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="py-5 sr-item">
                  <h4 className="mb-5">A propos</h4>
                  <p className="text-muted">
                    Deal Day est un concept innovant en 2022 mettre en relation
                    des artistes avec des maisons de disques en 3 clics c’est
                    désormais possible pour 3,99 € / mois seulement votre
                    présence sur le Web en présentant votre profil est de mise
                    en relation directement avec des agents maison de disques
                    grandes marques pour promouvoir votre titre votre album la
                    discussion en virtuel c’est désormais possible avec la
                    nouvelle application Web et mobile guilde à vos claviers à
                    très vite pour de nouvelles aventures…
                  </p>
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

export default About;
