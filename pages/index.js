import Link from 'next/link'
import Head from 'next/head'
import Date from '../components/date'

import getSortedPostsData from '../lib/posts'
import Layout, {siteTitle} from '../components/layout'
import utilStyles from '../styles/utils.module.css'



export async function getStaticProps(){
  const allPostsData = getSortedPostsData()
  return{
    props:{
      allPostsData
    }
  }
}

export default function Home({ allPostsData }) {
  return (
   <Layout home>
     <Head>
       <title>{siteTitle}</title>
     </Head>
     <section className={utilStyles.headingMd}>
     <p style={{textAlign:"center",fontWeight:"bold"}}>The web3 content creator(Solami)</p>
     </section>


     <section style={{display:"flex",flexDirection:"column", padding:"1rem"}} className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
       <h2 className={utilStyles.headingLg}>Series & Articles</h2>
       <ul className={utilStyles.list}>
         {allPostsData.map(({id,date,title})=>(
           <li className={utilStyles.listItem} key={id}>
            <Link href={`/posts/${id}`}>
              <a>{title}</a>
            </Link>
            <br/>
            <small className={utilStyles.lightText}>
              <Date dateString={date}/>
            </small>
           </li>
         ))}
       </ul>
     </section>
   </Layout>
  )
}
