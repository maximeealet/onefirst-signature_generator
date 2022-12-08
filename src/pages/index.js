import * as React from "react"
import { graphql, useStaticQuery } from "gatsby";
import { Seo } from "../components/seo";


const IndexPage = () => {
   const dataSite = useStaticQuery(graphql`
    allDatoCmsBanner {
    nodes {
      banner {
        url
        height
        width
      }
      name
    }
  }
   `);
  return <div>yolo</div>;
}

export default IndexPage

export const Head = () => ( <Seo />);
