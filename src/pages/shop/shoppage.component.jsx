import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import {
  firestore,
  covertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";

import { updatedCollections } from "../../redux/shop/shop.actions";
import WithSpinner from "../../components/with-spinner/with-spinner.component";

import CollectionOverview from "../../components/collection-overview/collection-overview.component";
import CollectionPage from "../collection/collection.component";

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  state = {
    loading: true,
  };
  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection("collections");

    this.unsubscribeFromSnapshot = collectionRef.onSnapshot(
      async (snapshot) => {
        const collectionsMap = covertCollectionsSnapshotToMap(snapshot);
        updateCollections(collectionsMap);
        this.setState({ loading: false });
      }
    );
  }

  render() {
    const { match } = this.props;
    const { loading } = this.state;
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          render={(props) => (
            <CollectionOverviewWithSpinner isLoading={loading} {...props} />
          )}
        />
        <Route
          exact
          path={`${match.path}/:collectionId`}
          render={(props) => (
            <CollectionPageWithSpinner isLoading={loading} {...props} />
          )}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateCollections: (collectionsMap) =>
    dispatch(updatedCollections(collectionsMap)),
});
export default connect(null, mapDispatchToProps)(ShopPage);
