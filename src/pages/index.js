import {useRef, useState } from "react";
import { graphql, useStaticQuery } from "gatsby";
import { Seo } from "../components/seo";
import { ImageToBase64 } from "../components/imageToBase64";

const IndexPage = () => {
  const dataSite = useStaticQuery(graphql`
    query {
      allDatoCmsBanner(sort: { position: ASC }) {
        nodes {
          id
          image {
            url
            height
            width
          }
          name
        }
      }
      allDatoCmsAgence(sort: { position: ASC }) {
        nodes {
          id
          adress
          adress2
          city
          name
          phone
          postalCode
        }
      }
      datoCmsLegalsnotice {
        legals
      }
      datoCmsLogo {
        id
        image {
          url
          width
          height
          alt
          title
        }
      }
    }
  `);

  const [userIdentity, setuserIdentity] = useState({
    firstName: "Jean-Michel",
    lastName: "Ouanefeurst",
    jobTitle: "Lead transformation digitale",
    mobilePhone: "+33 (0)6 83 62 08 72",
  });

const firstRef = useRef(null);
const lastRef = useRef(null);
const jobRef = useRef(null);
const mobilePhoneRef = useRef(null);

const agencyRef = useRef(null);

  const [agency, setAgency] = useState(dataSite.allDatoCmsAgence.nodes[0]);
  const [banner, setBanner] = useState(dataSite.allDatoCmsBanner.nodes[0]);


  const bannerChange = (event) => {
    const bannerToShow = dataSite.allDatoCmsBanner.nodes.find((obj) => {
      return obj.name === event.target.value;
    });
     setBanner(bannerToShow);
  };

  function handleGenerate(event) {
    event.preventDefault();
    setuserIdentity({
      firstName: firstRef.current.value,
      lastName: lastRef.current.value,
      jobTitle: jobRef.current.value,
      mobilePhone: mobilePhoneRef.current.value,
    });
    const agencyToShow = dataSite.allDatoCmsAgence.nodes.find((obj) => {
      return obj.name === agencyRef.current.value;
    });
    setAgency(agencyToShow);
  }



  return (
    <>
      <div id="main_wrapper">
        <img
          src={dataSite.datoCmsLogo.image.url}
          alt={dataSite.datoCmsLogo.image.alt}
          title={dataSite.datoCmsLogo.image.title}
          className="logo"
        />
        <h1>Générateur de signature</h1>
        <form id="signature_generator" onSubmit={handleGenerate}>
          <div className="form-group">
            <label htmlFor="Agence" className="form-label">
              Agence
            </label>
            <select
              name="agence"
              id="agency"
              className="form-select"
              ref={agencyRef}
              // onChange={agencyChange}
            >
              {dataSite.allDatoCmsAgence.nodes.map((agency) => {
                return (
                  <option key={agency.id} value={agency.name}>
                    {agency.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Prénom *
            </label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              required
              size="24"
              placeholder={userIdentity.firstName}
              className="form-control"
              ref={firstRef}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Nom *
            </label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              required
              size="24"
              placeholder={userIdentity.lastName}
              className="form-control"
              ref={lastRef}
            />
          </div>
          <div className="form-group">
            <label htmlFor="job" className="form-label">
              Poste *
            </label>
            <input
              type="text"
              name="job"
              id="job"
              required
              size="24"
              placeholder={userIdentity.jobTitle}
              className="form-control"
              ref={jobRef}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone-mobile" className="form-label">
              Téléphone portable{" "}
            </label>
            <input
              type="text"
              name="phone-mobile"
              id="phone-mobile"
              size="24"
              placeholder={userIdentity.mobilePhone}
              className="form-control"
              ref={mobilePhoneRef}
            />
          </div>
          <div className="form-group">
            <label htmlFor="banner" className="form-label">
              Bannière
            </label>
            <select
              name="bannerSelect"
              id="bannerSelect"
              onChange={bannerChange}
              className="form-select"
            >
              {dataSite.allDatoCmsBanner.nodes.map((bannerItem) => (
                <option key={bannerItem.id} value={bannerItem.name}>
                  {bannerItem.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn">
            Générer la signature
          </button>
        </form>
        <span className="required">* Ces champs sont obligatoires</span>
      </div>
      <div id="generated_wrapper">
        <div id="generated_inner">
          <ul className="nav nav-tabs" id="myTab" role="presentation">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="html-tab"
                data-bs-toggle="tab"
                data-bs-target="#html"
                type="button"
                role="tab"
                aria-controls="html"
                aria-selected="true"
              >
                HTML
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="code-tab"
                data-bs-toggle="tab"
                data-bs-target="#code"
                type="button"
                role="tab"
                aria-controls="code"
                aria-selected="false"
              >
                CODE
              </button>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="html"
              role="tabpanel"
              aria-labelledby="html-tab"
            >
              <div id="generated_signature">
                <p
                  style={{
                    margin: 0,
                    fontWeight: 500,
                    fontSize: 14,
                    fontFamily:
                      "Avenir Next, Lato, -apple-system, Roboto, Helvetica Neue, sans-serif",
                    color: "black !important",
                  }}
                >
                  <span style={{ fontWeight: 600 }}>
                    {userIdentity.firstName + " " + userIdentity.lastName}
                  </span>
                  <br />
                  <span>{userIdentity.jobTitle}</span>
                </p>
                <p style={{ margin: "12px 0 16px 0" }}>
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                      fontFamily:
                        "Avenir Next, Lato, -apple-system, Roboto, Helvetica Neue, sans-serif",
                      color: "black !important",
                    }}
                  >
                    {userIdentity.mobilePhone}
                  </span>
                  <br />
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                      fontFamily:
                        "Avenir Next, Lato, -apple-system, Roboto, Helvetica Neue, sans-serif",
                      color: "black !important",
                    }}
                  >
                    {agency.phone}
                  </span>
                </p>
                <p id="generated_image">
                  <ImageToBase64
                    url={banner.image.url}
                    width={banner.image.width}
                    height={banner.image.height}
                    alt={banner.image.alt}
                    title={banner.image.title}
                  />
                </p>
                <div style={{ margin: "0px 0px 12px 0" }}>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                      fontFamily:
                        "Avenir Next, Lato, -apple-system, Roboto, Helvetica Neue, sans-serif",
                      color: "black !important",
                    }}
                  >
                    <div>{agency.adress}</div>
                    {agency.adress2 !== "" && <div>{agency.adress2}</div>}
                    <div>{agency.postalCode + " " + agency.city}</div>
                  </div>
                  <a
                    href="http://www.onefirstgroup.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      margin: 0,
                      color: "#0055FB",
                      fontSize: 14,
                      fontWeight: 500,
                      fontFamily:
                        "Avenir Next, Lato, -apple-system, Roboto, Helvetica Neue, sans-serif",
                      textDecoration: "none",
                    }}
                  >
                    www.onefirstgroup.com
                  </a>
                </div>
                <p
                  style={{ margin: 0 }}
                  dangerouslySetInnerHTML={{
                    __html: dataSite.datoCmsLegalsnotice.legals,
                  }}
                ></p>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="code"
              role="tabpanel"
              aria-labelledby="code-tab"
            >
              ...
            </div>
          </div>
        </div>
      </div>

      <script src="https://cdn.jsdelivr.net/npm/clipboard@2.0.6/dist/clipboard.min.js"></script>
      <script
        src="https://code.jquery.com/jquery-1.12.4.min.js"
        integrity="sha384-nvAa0+6Qg9clwYCGGPpDQLVpLNn0fRaROjHqs13t4Ggj3Ez50XnGQqc/r8MhnRDZ"
        crossOrigin="anonymous"
      ></script>
      <script>
        {/* new ClipboardJS('.btn-copy');

        document.getElementById("signature_generator").addEventListener("submit", generate_signature);

        function changeBanner() {
                currentBanner = document.getElementById("banner").value;
                document.getElementById('generated_image').innerHTML = image[currentBanner];
        }

        function generate_signature(event) {
            event.preventDefault();
            let name = document.getElementById("firstname").value + ' ' + document.getElementById("lastname").value;
            let job = document.getElementById("job").value;
            // let fixed_phone = document.getElementById('phone-fixed').value != '' ? document.getElementById('phone-fixed').value : 'F. ' + document.getElementById('phone-fixed').value : '';
            let agence = document.getElementById("agency").value;
            let adresse = new Object();
            adresse.paris="47 rue Roque de Fillol<br>92800 Puteaux";
            adresse.lyon="Newton Office Vaise<br>55ter avenue René CASSIN<br>69009 Lyon";
            adresse.bordeaux="5 allées de Tourny<br>33 000 Bordeaux";
            let telephone = new Object();
            telephone.paris="+33 (0)1 83 62 08 72";
            telephone.lyon="";
            telephone.bordeaux="+33 (0)6 74 37 35 23";
            let fixed_phone = agence != 'bordeaux' ? telephone[agence] : '';
            let mobile_phone = document.getElementById('phone-mobile').value != '' ? document.getElementById('phone-mobile').value + '<br>' : '';
            let banner = document.getElementById("banner").value;
        
            let ml = '<p style="margin: 0px; font-family: Avenir Next, Lato, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif; font-size: 10px; color: #9f9f9f !important;">Afin de contribuer au respect de&nbsp;l\'environnement, merci de n\'imprimer ce courriel que si&nbsp;nécessaire.<br>Ce message et toutes les pièces jointes sont établis à l’attention&nbsp;exclusive de ses destinataires. Ce message peut contenir des&nbsp;informations confidentielles, légalement ou&nbsp;conventionnellement protégées. Si vous recevez ce message&nbsp;par erreur et/ou si vous n’êtes pas le destinataire désigné de ce&nbsp;message, la lecture, la copie, la diffusion, la publication ou&nbsp;l’utilisation de ce message sont strictement interdites. Merci&nbsp;d’avertir immédiatement l’expéditeur et de détruire ce message&nbsp;(ainsi que toutes les copies) et les pièces jointes s’y rattachant.&nbsp;<br>Onefirst traite vos données à caractère personnel pour&nbsp;analyser votre demande et y faire suite, ainsi que pour la gestion&nbsp;de notre relation commerciale. Pour en savoir plus sur la gestion&nbsp;de vos données et vos droits, consultez la&nbsp;<a href="https://onefirstgroup.com/politique-de-confidentialite/" target="_blank" rel="noopener noreferrer" style="margin:0px; color:#9f9f9f; text-decoration:underline">Politique de confidentialité de Onefirst.</a></p>';
            let signature = '<p style="font-size:14px; font-weight: 500; font-family:Avenir Next, Lato, -apple-system, Roboto, Helvetica Neue, sans-serif; color: black !important; margin:0"> <span style="font-weight: 600;">' + name + '</span><br>' + job + '</p><p style="font-size:14px; font-weight: 500; font-family:Avenir Next, Lato, -apple-system, Roboto, Helvetica Neue, sans-serif; color: black !important; margin:12px 0 0 0;">' + mobile_phone + fixed_phone + '</p><p style="margin:16px 0" id="generated_image" >' + image[banner] + '</p><p style="margin: 0px 0px 12px 0; font-size:14px; font-weight: 500; font-family:Avenir Next, Lato, -apple-system, Roboto, Helvetica Neue, sans-serif; color: black !important;">'+ adresse[agence] +'<br><a href="http://www.onefirstgroup.com" target="_blank" rel="noopener noreferrer" style="margin:0px; color:#0055FB;">www.onefirstgroup.com</a></p>' + ml;
            document.getElementById('generated_signature').innerHTML = signature;
            document.getElementById('htmlcode').value = signature;
        } */}
      </script>
    </>
  );
};

export default IndexPage;

export const Head = () => (
  <>
    <Seo />
  </>
);
