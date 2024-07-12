import React from "react";
import { Container, Box, Typography } from "@mui/material";

const CardList = ({ cards }) => {
  if (!cards || cards.length === 0) {
    return <Typography>No data available</Typography>;
  }
  return (
    <>
      {!cards || cards.length === 0 ? (
        <Typography>No data avilable</Typography>
      ) : (
        <Box>
          <Typography variant="h4" gutterBottom>
            Card List
          </Typography>
          <Box
            style={{ overflowX: "auto", whiteSpace: "nowrap" }}
          >
            <Box display="flex" flexDirection= "column">
              {cards.map((card) => (
                <Box
                  key={card.id}
                  p={2}
                  border="1px solid #ddd"
                  borderRadius="8px"
                  m={2}
                >
                  <Typography variant="h6">{card.text}</Typography>
                  <div style={{display:card.images.length > 1 ? 'flex' : 'block',width:card.images.length > 1 ? '100%' : '50%'}}>
                    {card.images &&
                      card.images.length > 0 &&
                      card.images.map((image, index) => (
                        <Box style={{width:'100%'}} m={1}>
                          <img
                            key={index}
                            src={image}
                            alt={`Card image ${index}`}
                            style={{
                              width: "100%",
                              margin: "10px 0",
                              height:'173px',
                              backgroundRepeat: "no-repeat",
                              backgroundSize: "cover",
                            }}
                          />
                        </Box>
                      ))}
                  </div>
                  <div style={{width:'100%',display:'flex'}}>
                    {card?.videos &&
                      card?.videos?.length > 0 &&
                      card.videos.map((video, index) => (
                        <Box style={{display:'flex',width:'50%'}} m={1}>
                          <iframe
                            key={index}
                            src={video}
                            title={`Card video ${index}`}
                            frameBorder="0"
                            allowFullScreen
                            style={{
                              width: "100%",
                              height: "200px",
                              margin: "10px 0",
                            }}
                          />
                        </Box>
                      ))}
                  </div>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default CardList;
