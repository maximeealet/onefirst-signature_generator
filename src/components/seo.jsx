import { useSiteMetadata } from "../hooks/use-site-metadata"

export const Seo = ({ title, pathname }) => {
    const { title: defaultTitle, siteUrl } = useSiteMetadata()

    const seo = {
        title: title || defaultTitle,
        url: `${siteUrl}${pathname || ``}`,
    }

    return (
        <>
            <title>{seo.title}</title>
        </>
    )
}