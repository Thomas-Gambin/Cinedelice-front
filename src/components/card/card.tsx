import classNames from "classnames";
import "./card.scss";

interface BaseCardProps {
  orientation?: "horizontal" | "vertical";
  title: string;
  img: {
    src: string;
    alt: string;
  };
  description?: string;
}

interface RecipeCardProps extends BaseCardProps {
  type: "recipe";
  category: string;
}

interface MediaCardProps extends BaseCardProps {
  type: "media";
  category?: string;
}

type CardProps = RecipeCardProps | MediaCardProps;

export const Card = ({
  orientation = "horizontal",
  title,
  img,
  description,
  category,
  type,
}: CardProps) => {
  return (
    <div className={classNames("card", orientation)}>
      {/* <img src={img.src} alt={img.alt} className="card-img" /> */}
      {/* 
        src={recipe?.coverImg || "/recipe-placeholder.jpg"}
        if image is not found, use default image for recipe only, for media use media-placeholder.jpg
       */}
      <img
        src={
          type === "recipe"
            ? img.src || "/recipe-placeholder.jpg"
            : img.src || "/media-placeholder.jpg"
        }
        alt={img.alt}
        className="card-img"
      />
      <div className="card-info">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>

        {type === "recipe" && (
          <div className="card-footer">
            <span className="card-category">{category}</span>
          </div>
        )}
      </div>
    </div>
  );
};
