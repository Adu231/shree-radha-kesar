import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading'

const landscapeImage = '/images/saffron-harvest.jpg'

export default function About() {
  return (
    <div className="page inner-page">
      <section className="page-hero page-hero--burgundy">
        <div className="container page-hero__inner">
          <p className="eyebrow eyebrow--light">About Shree Radha Kesar</p>
          <h1>Rooted in a love for <em>the real thing.</em></h1>
          <p>We are building a kesar experience that feels as honest as the ingredient itself — warm, vivid and worth slowing down for.</p>
        </div>
      </section>
      <section className="section-pad about-intro">
        <div className="container about-intro__grid">
          <div className="about-intro__visual">
            <img src={landscapeImage} alt="Kashmir landscape with kesar harvest" loading="lazy" />
            <span>Of Kashmir, in spirit</span>
          </div>
          <div className="about-intro__copy">
            <SectionHeading eyebrow="Our point of view" title="Premium does not need to be loud." copy="It can be felt in the simplicity of the product, the care in the presentation and the warmth of a direct conversation. That is the experience we are creating for Shree Radha Kesar Supplier." />
            <p>Our visual language draws from the valley’s deep burgundy earth, warm light and the unmistakable red of kesar threads. Our customer experience keeps the same focus: clear, personal and considered.</p>
            <Link to="/contact" className="text-link">Start a conversation <ArrowUpRight size={16} /></Link>
          </div>
        </div>
      </section>
      <section className="values-section section-pad section-pad--cream">
        <div className="container">
          <div className="section-intro-row">
            <SectionHeading eyebrow="What guides us" title="Four simple commitments." />
          </div>
          <div className="values-grid">
            <div><span>01</span><h3>Quality first</h3><p>Keep the ingredient at the centre of every decision.</p></div>
            <div><span>02</span><h3>Natural character</h3><p>Celebrate kesar’s colour, aroma and expressive nature.</p></div>
            <div><span>03</span><h3>Careful details</h3><p>Make the journey from pack to pantry feel considered.</p></div>
            <div><span>04</span><h3>Direct support</h3><p>Keep ordering and enquiries personal through WhatsApp.</p></div>
          </div>
        </div>
      </section>
      <section className="about-closing section-pad">
        <div className="container about-closing__inner">
          <p className="eyebrow">Made for your rituals</p>
          <h2>Let a little colour into the everyday.</h2>
          <Link to="/kesar" className="button button--burgundy">Explore the collection <ArrowUpRight size={17} /></Link>
        </div>
      </section>
    </div>
  )
}
