import React, { Component, useEffect, useState } from 'react';
import { withRouter } from "../withrouter";

import { ResponsiveRadialBar } from '@nivo/radial-bar'


class RadialBarChart extends Component {
  render() {
    //const d = require('./radialsample.json')
    return (
      <ResponsiveRadialBar
        data={this.props.data}
        valueFormat=">-.2f"
        padding={0.4}
        cornerRadius={2}
        margin={{ top: 40, right: 120, bottom: 40, left: 40 }}
        colors={{ scheme:'set2' }}
        radialAxisStart={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
        circularAxisOuter={{ tickSize: 5, tickPadding: 12, tickRotation: 0 }}
        legends={[
          {
            anchor: 'right',
            direction: 'column',
            justify: false,
            translateX: 130,
            translateY: 0,
            itemsSpacing: 6,
            itemDirection: 'left-to-right',
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: '#999',
            symbolSize: 18,
            symbolShape: 'square',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#000'
                }
              }
            ]
          }
        ]}
      />
    )
  }

}

export default withRouter(RadialBarChart);