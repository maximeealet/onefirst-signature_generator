import { useRef, useState, useEffect } from "react";
import { graphql, useStaticQuery } from "gatsby";
import { Seo } from "../components/seo";
import useClipboard from "react-use-clipboard";

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
          position
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



const defaultIdentity = {
    firstName: "Jean-Michel",
    lastName:"Ouanefeurst",
    jobTitle: "Lead transformation digitale",
    mobilePhone: "+33 (0)6 83 62 08 72",
}

let defaultbanner = dataSite.allDatoCmsBanner.nodes[0];

const [banners64, setBanners64] = useState("");

function imageToBase64(imageURL) {
  return fetch(imageURL)
    .then((res) => res.blob())
    .then((blob) => {
      return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.onload = () => {
          resolve(`data:image/png;base64,${reader.result.split(",")[1]}`);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    })
    .catch((error) => {
      console.error("There was an error!", error);
    });
}

useEffect(() => {
  const fetchBanners = async () => {
    const result = await Promise.allSettled(
      dataSite.allDatoCmsBanner.nodes.map((node) =>
        imageToBase64(node.image.url)
      )
    );
    defaultbanner.image.base64 = result[0].value;
    setBanners64(result);
  };

  fetchBanners().catch(console.error);
}, [dataSite.allDatoCmsBanner.nodes, defaultbanner]);


const [firstName, setFirstName] = useState(defaultIdentity.firstName);
const [lastName, setLastName] = useState(defaultIdentity.lastName);
const [jobTitle, setJobTitle] = useState(defaultIdentity.jobTitle);

const [mobileInput, setmobileInput] = useState("");

const [userIdentity, setuserIdentity] = useState(defaultIdentity);

const [agency, setAgency] = useState(dataSite.allDatoCmsAgence.nodes[0]);
const [banner, setBanner] = useState(defaultbanner);

const tabsRef = useRef(null);
const topRef = useRef(null);
const generatedSignatureRef = useRef(null);

const [codeInput, setcodeInput] = useState("");

const bannerChange = (event) => {
const bannerToShow = dataSite.allDatoCmsBanner.nodes.find((obj) => {
  return obj.name === event.target.value;
});
const bannerPosition = bannerToShow.position - 1;
const base64ToShow = banners64[bannerPosition].value;
bannerToShow.image.base64 = base64ToShow;
  setBanner(bannerToShow);
};

  const agencyChange = (event) => {
    const agencyToShow = dataSite.allDatoCmsAgence.nodes.find((obj) => {
      return obj.name === event.target.value;
    });
    setAgency(agencyToShow);
  };

  function handleGenerate(event) {
    event.preventDefault();
    let userPhone = "";
    if (mobileInput.trim().length !== 0) {
      userPhone = mobileInput;
    } else {
      userPhone = "";
    }
    if (event.target.checkValidity()) {
      setuserIdentity({
        firstName: firstName,
        lastName: lastName,
        jobTitle: jobTitle,
        mobilePhone: userPhone,
      });
      tabsRef.current?.scrollIntoView({ behavior: "smooth" });
    }
   
  }

  const [isCopied, setCopied] = useClipboard(
    codeInput,
    {
      successDuration: 2000,
    }
  );

  function resetForm() {
      document.getElementById("signature_generator").reset();
      setuserIdentity(defaultIdentity);
      setAgency(dataSite.allDatoCmsAgence.nodes[0]);
      setBanner(dataSite.allDatoCmsBanner.nodes[0]);
      topRef.current?.scrollIntoView({ behavior: "smooth" });
      setcodeInput("");
  }

  const generatedIdentity=useRef(false);

  useEffect(() => {
    if (generatedIdentity.current) {
       setcodeInput(generatedSignatureRef.current.innerHTML);
    } else {
      generatedIdentity.current = true;
    }
     
  }, [userIdentity,banner,agency]);
  


  return (
    <>
      <div id="main_wrapper" ref={topRef}>
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
              onChange={agencyChange}
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
              placeholder={defaultIdentity.firstName}
              className="form-control"
              onChange={(event) => {
                setLastName(event.target.value);
              }}
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
              placeholder={defaultIdentity.lastName}
              className="form-control"
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
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
              placeholder={defaultIdentity.jobTitle}
              className="form-control"
              onChange={(event) => {
                setJobTitle(event.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneMobile" className="form-label">
              Téléphone portable{" "}
            </label>
            <input
              type="text"
              name="phoneMobile"
              id="phoneMobile"
              size="24"
              placeholder={defaultIdentity.mobilePhone}
              className="form-control"
              onChange={(event) => {
                setmobileInput(event.target.value);
              }}
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
          <div className="d-grid gap-2 d-md-block buttons">
            <button type="submit" className="btn">
              Générer la signature
            </button>
            <button
              type="button"
              className="btn btn-outline"
              onClick={resetForm}
            >
              Reset
            </button>
          </div>
        </form>
        <span className="required">* Ces champs sont obligatoires</span>
      </div>
      <div id="generated_wrapper" ref={tabsRef}>
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
              <div id="generated_signature" ref={generatedSignatureRef}>
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
                  {userIdentity.mobilePhone.length !== 0 && (
                    <>
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
                    </>
                  )}
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
                  <img
                    src={banner.image.base64}
                    width={banner.image.width}
                    height={banner.image.height}
                    alt={banner.name}
                    title={banner.name}
                  ></img>
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
                <div
                  style={{ margin: 0 }}
                  dangerouslySetInnerHTML={{
                    __html: dataSite.datoCmsLegalsnotice.legals,
                  }}
                ></div>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="code"
              role="tabpanel"
              aria-labelledby="code-tab"
            >
              <label htmlFor="htmlcode">Code html</label>
              <textarea
                id="htmlcode"
                name="htmlcode"
                placeholder="Générez votre signature pour voir le code html"
                defaultValue={codeInput}
                readOnly
              ></textarea>
              <button className="btn btn-outline btn-copy" onClick={setCopied}>
                {isCopied ? "Code copié !" : "Copier le code"}
              </button>
              {/* Was it copied? {isCopied ? "Yes! 👍" : "Nope! 👎"} */}
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
      <script>{/* new ClipboardJS('.btn-copy'); */}</script>
    </>
  );
};

export default IndexPage;

export const Head = () => (
  <>
    <Seo />
  </>
);
