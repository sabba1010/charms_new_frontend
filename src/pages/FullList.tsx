import FullListbanner from '../components/FullList/FullListbanner';
import FullListinfo from '../components/FullList/FullListinfo';
import cardBg from '../assets/cardbackground.png';

const FullList = () => {
  return (
    <div className="min-h-screen pt-16 relative bg-[#fdfdfd]">
      {/* Background Image with White Opacity Overlay matching the cards */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(253, 253, 253, 1) 0%, rgba(253, 253, 253, 0.7) 40%, rgba(253, 253, 253, 0.4) 100%), url(${cardBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      <div className="relative z-10">
        {/* Map Banner Section — starts below fixed navbar */}
        <FullListbanner />

        {/* Listings Info Section — flush below the map */}
        <FullListinfo />
      </div>
    </div>
  );
};

export default FullList;
