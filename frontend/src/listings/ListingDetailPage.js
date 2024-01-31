import "./ListingDetailPage.css"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../common/NotFound";
import LoadingSpinner from "../common/LoadingSpinner";
import ShareBAndBApi from "../api/api";

/** Page for showing listing details
 * Has URL param id
 *
 * Props:
 * - None
 *
 * States:
 * - listingDetails { id, name, address, description, price, photos }
 * - error (true/false)
 *
 * RoutesList -> ListingDetailPage -> { LoadingSpinner, NotFound }
 */

function ListingDetailPage() {
  const { id } = useParams();
  console.log("ListingDetailPage rendered. id:", id);


  const [listing, setListing] = useState(null);
  const [error, setError] = useState(false);

  console.log("listing val", listing);

  useEffect(function getListingDetailOnMount() {
    async function getListingDetail() {
      try{
        const listingResult = await ShareBAndBApi.getListing(id);
        setListing(listingResult);
      }
      catch(errs){
        setError(true);
        console.log("Errors:", errs);
      }
    }
    getListingDetail();
  }, [id]);

  if(error === true) return <NotFound />;
  if (!listing) return <LoadingSpinner/>;

  return (
    <div className="ListingDetailPage">
      <h1>{listing.name}</h1>
      <h2>{listing.address}</h2>
      <p>{listing.description}</p>
      <p>{listing.price}</p>
      {listing.photos.map(photo =>
        <div key={photo.id}>
          <img src={photo.source} alt={photo.description}></img>
          <p>{photo.description}</p>
        </div>)}
    </div>
  );
}

export default ListingDetailPage;