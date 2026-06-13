import Hero from "../Components/Home/Hero";
import HowItWorks from "../Components/Home/HowItworks";
import LiveDonations from "../Components/Home/LiveDonations";
import Impact from "../Components/Home/Impact";
import Test from "../Components/Home/Test";
import Footer from "../Components/common/Footer";




function Home(){

  return(
    <div className="overflow-x-hidden w-full">
      <Hero/>
      <HowItWorks/>
      <LiveDonations/>
      <Impact/>
      <Test/>
      <Footer/>
    </div>
  )
}
export default Home;