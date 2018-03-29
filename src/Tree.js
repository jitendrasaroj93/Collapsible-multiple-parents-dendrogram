import React, {Component} from 'react';
import { Group } from '@vx/group';
import { Tree } from '@vx/hierarchy';
import { hierarchy } from 'd3-hierarchy';

import { LinkHorizontal } from '@vx/shape';
import './tree.css';

export default class extends Component {
  constructor(props){
    super();
    this.state = {
      stepPercent: 0.5
    };
  }

  render() {
    //Get props value and assign to local variables
    //data is JSON data
    
    const {
      data,
      width,
      height,
      margin = {
        top: 30,
        left: 60,
        right: 60,
        bottom: 30
      }
    } = this.props;
    const { stepPercent } = this.state;


    //calculate width of Area to display dendrogram
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    let origin;
    let sizeWidth;
    let sizeHeight;
    
    origin = { x: 0, y: 0 };
    sizeWidth = innerHeight;
    sizeHeight = innerWidth;
//Create more cross LINKS i.e. children with multiple parents
//Children with single parent LINKS are created with data.links()
function createCrossLinks(links){
  let moreLinks = [];
  let source=[], target=[];

  links.map((a,b)=>{
    let targetNodeData = a.target.data;

    if(typeof(targetNodeData.parent_id)=== 'object'){
      target.push(a.target);
    }
  })
  links.map((a,b)=>{
    let sourceNodeData = a.source.data;
    target.map((x,y)=>{
      if(typeof(sourceNodeData.parent_id)=== 'number' && sourceNodeData.parent_id === x.data.parent_id.id){
        source.push(a.source);
        moreLinks.push({source:a.source, target:x});
      }
    });
    
  })
  return moreLinks;
}

function concatArray(arr1, arr2){
  return arr1.concat(arr2);
}
    return (
      <div>
        <svg width={width} height={height}>
          <Tree
            top={margin.top}
            left={margin.left}
            root={hierarchy(data, d => (d.isExpanded ? d.children : null))}
            size={[
              sizeWidth,
              sizeHeight
            ]}
            separation={(a, b) => (a.parent === b.parent ? 1 : .5) / a.depth}
          >
            {({ data }) => (
              <Group
                top={origin.y}
                left={origin.x}
              >
              {/*Link Component*/}
                {concatArray(data.links(),createCrossLinks(data.links())).map((link, i) => {
                  //declare Link components in case of other link components such as steps or line
                  let LinkComponent;
                  //for Horizontal link
                  LinkComponent = LinkHorizontal; 
                  return (
                    <LinkComponent
                      data={link}
                      percent={stepPercent}
                      stroke="#374469"
                      strokeWidth="1"
                      fill="none"
                      key={i}
                    />
                  )
                })}
                {/*Node component*/}
                {data.descendants().map((node, key) => {
                  let top;
                  let left;
                    top = node.x;
                    left = node.y;
                    
                  return (
                    <Group top={top} left={left} key={key}>
                    //Cicle for Node when depth is 0 i.e. first Node
                      {node.depth === 0 && (
                        <circle
                          r={12}
                          stroke="#0000a0"
                          strokeWidth="3"
                          fill="#fff"
                          onClick={() => {
                            node.data.isExpanded = !node.data.isExpanded;
                            //console.log(node);
                            this.forceUpdate();
                          }}
                        />
                      )}
                      Circle for Node when depth is not 0
                      {node.depth !== 0 && (
                        <circle
                          r={12}
                          stroke="#0000a0"
                          strokeWidth="3"
                          fill={node.data.children ? "#00f" : '#fff'}
                          onClick={() => {
                            node.data.isExpanded = !node.data.isExpanded;
                            //console.log(node);
                            this.forceUpdate();
                          }}
                        />
                        
                      )}
                      // Text Title of node
                      <text
                        dy={'.33em'}
                        fontSize={9}
                        dx={'-1.5em'}
                        fontFamily="Arial"
                        textAnchor={'end'}
                        style={{ pointerEvents: 'none' }}
                        fill={
                          node.depth === 0 ? (
                            '#71248e'
                          ) : node.children ? (
                            'black'
                          ) : (
                                'black'
                              )
                        }
                      >
                        {node.data.name}
                      </text>
                    </Group>
                  );
                })}
              </Group>
            )}
          </Tree>
        </svg>
      </div>
    );
  }
}
