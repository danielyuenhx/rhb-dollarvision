import React, { Component } from 'react';
import { Layer } from 'recharts';

export default class Link extends Component {
  static displayName = 'SankeyLinkDemo';

  render() {
    const {
      sourceX,
      targetX,
      sourceY,
      targetY,
      sourceControlX,
      targetControlX,
      linkWidth,
      index,
      payload,
    } = this.props;
    const gradientID = `linkGradient${index}`;
    console.log(payload);
    return (
      <Layer key={`CustomLink${index}`}>
        <defs>
          <linearGradient id={gradientID}>
            <stop
              offset="100%"
              stopColor={
                (payload.source.name === 'Total Assets' &&
                  payload.target.name === 'Expenses') ||
                payload.source.name === 'Expenses'
                  ? '#e87c64'
                  // : payload.source.name === 'Previous Balance' || payload.target.name === 'Balance'
                  // ? '#73dffa'
                  : '#81e383'
              }
            />
            {/* <stop offset="80%" stopColor="red" /> */}
          </linearGradient>
        </defs>
        <path
          d={`
            M${sourceX},${sourceY + linkWidth / 2}
            C${sourceControlX},${sourceY + linkWidth / 2}
              ${targetControlX},${targetY + linkWidth / 2}
              ${targetX},${targetY + linkWidth / 2}
            L${targetX},${targetY - linkWidth / 2}
            C${targetControlX},${targetY - linkWidth / 2}
              ${sourceControlX},${sourceY - linkWidth / 2}
              ${sourceX},${sourceY - linkWidth / 2}
            Z
          `}
          fill={`url(#${gradientID})`}
          strokeWidth="0"
          onMouseEnter={() => {
            this.setState({ fill: 'rgba(0, 136, 254, 0.5)' });
          }}
          onMouseLeave={() => {
            this.setState({ fill: 'url(#linkGradient)' });
          }}
        />
      </Layer>
    );
  }
}
