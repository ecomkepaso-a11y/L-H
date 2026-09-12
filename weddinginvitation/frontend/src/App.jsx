import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LoveQuotes from './components/LoveQuotes';
import Celebrations from './components/Celebrations';
import Message from './components/Message';
import Countdown from './components/Countdown';
import OurStory from './components/OurStory';
import Gallery from './components/Gallery';
import EventDetails from './components/EventDetails';
import RSVP from './components/RSVP';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main>
        <Hero />
        <LoveQuotes />
        <Celebrations />
        <Message />
        <Countdown />
        <OurStory />
        <Gallery />
        <EventDetails />
        <RSVP />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
