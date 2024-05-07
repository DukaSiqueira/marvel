import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import FavoriteIcon from "@mui/icons-material/Favorite";

import PropTypes from "prop-types";
import { IconButton } from "@mui/material";
import { FavoriteBorder } from "@mui/icons-material";

const CardHero = ({
  title,
  image,
  hasActions,
  isLiked,
  toggleLike,
}) => {
  return (
    <Card className="h-fit w-2/12">
      <CardMedia
        sx={{ height: 140 }}
        image={image}
        title={`Image of ${title}`}
      />
      <CardContent className="h-fit">
        <div className="flex flex-row justify-between items-center h-fit">
          <h5 className="text-lg font-bold">{title}</h5>
          {hasActions && (
            <IconButton
              aria-label="add to favorites"
              onClick={() => toggleLike(!isLiked)}
            >
              {isLiked ? (
                <FavoriteIcon color="error" />
              ) : (
                <FavoriteBorder color="error" />
              )}
            </IconButton>
          )}
        </div>

      </CardContent>
    </Card>
  );
};

CardHero.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  hasActions: PropTypes.bool,
  isLiked: PropTypes.bool,
  toggleLike: PropTypes.func,
};

export default CardHero;
