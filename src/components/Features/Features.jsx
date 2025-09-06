import "./Features.css";
import feature_1_src from "../../assets/feature_1.png"
import feature_2_src from "../../assets/feature_2.png"
import feature_3_src from "../../assets/feature_3.png"



function FeatureBox({ image, title, description }) {
  return (
    <div className="box">
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
      <a href="#" className="btn">
        read more
      </a>
    </div>
  );

}
function Features() {
  const featuresData = [
    {
      image: feature_1_src,
      title: "High Performance",
      description: "Engineered for comfort and durability, perfect for sports and daily use.",
    },
    {
      image: feature_2_src,
      title: "Modern Style",
      description: "Stay trendy with designs that blend fashion and functionality seamlessly.",
    },
    {
      "image": feature_3_src,
      "title": "Innovative Comfort Technology",
      "description": "Experience unparalleled comfort with advanced cushioning and breathable materials.",
    }
  ];
  

  return (
    <div className="features" id="features">
      <h1 className="heading">
        our <span>features</span>
      </h1>

      <div className="box-container">
        {featuresData.map((feature, index) => (
          <FeatureBox
            key={index}
            image={feature.image}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
}

export default Features;
