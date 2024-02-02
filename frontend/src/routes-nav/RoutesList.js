import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../homepage/HomePage";
import ListingsPage from "../listings/ListingsPage";
import AddListingPage from "../listings/AddListingPage";
import ListingDetailPage from "../listings/ListingDetailPage";
import NotFound from "../common/NotFound";

/** Routes for sharebandb app.
 *
 * Props:
 * - currentUsername
 * -login()
 * -signup()
 *
 * States:
 * - None
 *
 * App -> RoutesList
 * -> {NotFound, ListingDetailPage, AddListingPage, ListingsPage}
 */

function RoutesList({ currentUsername, login, signup }) {
  return (
    <div className="pt-5">
      <Routes>
        <Route path="/listings/:id" element={<ListingDetailPage />} />
        <Route
          path="/listings/new"
          element={<AddListingPage/>}
        />
        <Route path="/listings" element={<ListingsPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default RoutesList;
