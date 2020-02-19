import React , { useState }  from 'react'
import { Helmet } from 'react-helmet'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import './all.sass'
import './styles.css'
import useSiteMetadata from './SiteMetadata'
import { withPrefix } from 'gatsby'
import IdentityModal, { useIdentityContext } from "react-netlify-identity-widget"
import "react-netlify-identity-widget/styles.css" 
import AgeGate from './AgeGate'

const TemplateWrapper = ({ children }) => {
  const { title, description } = useSiteMetadata()
  const identity = useIdentityContext()
  const [dialog, setDialog ] = useState(false)
  const [age, setAge] = useState(false)
  const name =
    (identity && identity.user && identity.user.user_metadata && identity.user.user_metadata.name) || "NoName"
    // console.log(JSON.stringify(identity))
    const isLoggedIn = identity && identity.isLoggedIn
    function isOfAge() {
      setAge(true)
    }

  return (
    <div>
      {isLoggedIn ?  
      <>
      {age ? 
      <>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${withPrefix('/')}img/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix('/')}img/favicon-32x32.png`}
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix('/')}img/favicon-16x16.png`}
          sizes="16x16"
        />

        <link
          rel="mask-icon"
          href={`${withPrefix('/')}img/safari-pinned-tab.svg`}
          color="#ff4400"
        />
        <meta name="theme-color" content="#fff" />

        <meta property="og:type" content="business.business" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content="/" />
        <meta
          property="og:image"
          content={`${withPrefix('/')}img/og-image.jpg`}
        />
      </Helmet>
      <button className="btn" onClick={() => setDialog(true)}>
        {isLoggedIn ? `Hello ${name}, Log out here!` : "LOG IN"}
        </button>
      <IdentityModal showDialog={dialog} onCloseDialog={() => setDialog(false)} onLogout={() => console.log('bye ', name)}/>
      <Navbar />
      <div>{children}</div>
      <Footer /> 
      </>
      :
      <AgeGate setAge={isOfAge}/>
      }
      </>
      : 
      <div id="gateway">
        <button className="btn" onClick={() => setDialog(true)}>
        {isLoggedIn ? `Hello ${name}, Log out here!` : "LOG IN"}
        </button>
        <IdentityModal showDialog={dialog} onCloseDialog={() => setDialog(false)} onLogout={() => console.log('bye ', name)}/>
      </div>
    }
    </div>
  )
}

export default TemplateWrapper
