import React from 'react';

class Home extends React.Component {
    render() {
      return (
        <section className="panel no-padding">
          <img style={{width:'100%'}} src={require('../../assets/images/homebg.jpeg')} />
        </section>
      );
    }
  }

  export default Home;