import React from 'react';
import { mobileAccordion } from '../../../assets/scripts/custom';

class LeftDetail extends React.Component {
    constructor(props)
    {
        super(props);
    }

    componentDidMount() {
        mobileAccordion();
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        mobileAccordion();
    }

    render() {
        var item = this.props.item;
        return (
            <div className="left mobile-accordion">
                {item &&
                    [            
                        <div className="header">
                            <div className="title-default">
                                {item.groupName}
                            </div>
                        </div>,
                        <div className="user-group-text">
                            <div>Grup İsmi</div>
                            <div>{item.groupName}</div>
                        </div>,
                        <div className="user-group-text">
                            <div>Grup Açıklaması</div>
                            <div>{item.groupDesc}</div>
                        </div>
                    ]
                }
            </div>
      );
    }
  }

  export default LeftDetail