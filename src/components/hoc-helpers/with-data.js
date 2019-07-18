import React, { Component } from "react";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";

const withData = View => {
  return class extends Component {
    state = {
      data: null,
      error: false
    };

    componentDidUpdate(prevProps) {
      if (this.props.getData !== prevProps.getData) {
        this.update();
      }
    }

    componentDidMount() {
      this.update();
    }

    update() {
      this.props
        .getData()
        .then(data => {
          this.setState({
            data
          });
        })
        .catch(e => {
          this.setState({
            error: true
          });
        });
    }

    render() {
      const { data, error } = this.state;

      if (error) {
        return <ErrorIndicator />;
      }

      if (!data) {
        return <Spinner />;
      }

      return <View {...this.props} data={data} />;
    }
  };
};

export default withData;
