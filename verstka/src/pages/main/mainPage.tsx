import React from "react"
import { Layout } from "antd"
import HeaderComponent from "../../components/header/header"
import ContentComponent from "../../components/content/content"
import FooterComponent from "../../components/footer/footer"

export default function MainPage() {
  return (
    <Layout>
      <HeaderComponent />
      <ContentComponent />
      <FooterComponent />
    </Layout>
  )
}
