import React from "react";
import { MdClose } from "react-icons/md";
import { IoIosColorPalette } from "react-icons/io";
import { TbClick } from "react-icons/tb";
import { LuPaintbrush } from "react-icons/lu";
import { Stack } from "@mui/material";
import { SketchPicker, HuePicker, CirclePicker } from 'react-color';

interface Level {
  color: string;
  temp: number;
}

interface actionMemory {
  blockid: number
  color1: string
  color2: string

}


function App() {
  const [Circles, SetCircles] = React.useState<JSX.Element[]>([<></>])
  const [mouseDown, SetMouseDown] = React.useState(false);
  const [colorOpen, setColorOpen] = React.useState(false);
  const [currentColor, SetCurrentColor] = React.useState('blue')
  const [BrushOrClick, SetBrushOrClick] = React.useState(false)
  const [SmoothToolSet, SetSmoothTool] = React.useState(false);
  const [RowCount, SetRowCount] = React.useState(0)
  const [ColCount, SetColCount] = React.useState(0)
  const [windowSize, setWindowSize] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight
  });



  const handleWheel = (event: any) => {
    if (event.deltaY > 0) {

      // DrawGrid(size - 5)
    } else if (event.deltaY < 0) {
      //DrawGrid(size + 5)
    }
  };
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const handleMouseOver = (e: any) => { 
    !SmoothToolSet && !BrushOrClick && mouseDown && e.target.setAttribute('fill', currentColor);
    
    SmoothToolSet && !BrushOrClick && mouseDown && SmoothTool(e);


  }

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function getRandomColorHotorCold() {
    const colors =
      ['#FF0000',

        '#E80017',

        '#D1002E',

        '#B90046',

        '#A2005D',

        '#8B0074',

        '#74008B',

        '#5D00A2',

        '#4600B9',

        '#2E00D1',

        '#1700E8',

        '#0000FF'
      ]
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

  function hexToRgb(hex: string) {


    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    console.log({ r, g, b })
    return { r, g, b };

  }



  function rgbToHex(r: number, g: number, b: number) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  function isValidColor(hexColor: string) {
    const regex = /^#([A-Fa-f0-9]{6})$/;
    return regex.test(hexColor);
  }
  function hexToHSL(hex: string) {
    // Convert hexadecimal color to HSL
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const l = (max + min) / 2;

    let h, s;
    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      if (h !== undefined) {
        h /= 6;
      } else {
        h = -1;
      }
    }

    return { h, s, l };
  }

  function compareColors(hex1: string, hex2: string) {

    const { l: l1 } = hexToHSL(hex1);
    const { l: l2 } = hexToHSL(hex2);
    return l1 - l2;

  }

  const sortColors = () => {
    console.log(Circles)

    const colorsCodes =
      Circles.map(
        (_, index: number) => {
          var color = document.getElementById(`${index}`)?.getAttribute('fill');
          if (isValidColor(color !== undefined && typeof color === 'string' ? color : '')) {
            return color;
          }
        });

    console.log(colorsCodes);
    // const sortedColors = colorsCodes.sort(compareColors);
    colorsCodes.sort()
    for (let index = 0; index < Circles.length; index++) {
      // Adjust delay time as needed

      const col: string = colorsCodes[index] !== undefined &&
        typeof colorsCodes[index] === 'string' ?
        colorsCodes[index] : " ";
      document.getElementById(`${index}`)?.setAttribute('fill',
        col
      );
    }
  }

  const SmoothTool = async (event:Event) => {

    var index:number = parseInt(event?.target?.id)

    

      var topleft = index - RowCount - 1;
      var topmid = index - RowCount;
      var topRight = index - RowCount + 1;
      var left = index - 1;
      var center = index;
      var Right = index + 1;
      var bottomLeft = index + RowCount - 1;
      var bottomCenter = index + RowCount;
      var bottomRight = index + RowCount + 1;

      //console.log(document.getElementById(`${index}`)?.getAttribute('fill'));

      var currentColor = document.getElementById(`${index}`)?.getAttribute('fill');

      var topleftval = document.getElementById(`${topleft}`)?.getAttribute('fill');
      var topmidval = document.getElementById(`${topmid}`)?.getAttribute('fill');
      var topRightval = document.getElementById(`${topRight}`)?.getAttribute('fill');
      var leftval = document.getElementById(`${left}`)?.getAttribute('fill');
      var centerval = document.getElementById(`${center}`)?.getAttribute('fill');
      var Rightval = document.getElementById(`${Right}`)?.getAttribute('fill');
      var bottomLeftval = document.getElementById(`${bottomLeft}`)?.getAttribute('fill');
      var bottomCenterval = document.getElementById(`${bottomCenter}`)?.getAttribute('fill');
      var bottomRightval = document.getElementById(`${bottomRight}`)?.getAttribute('fill');
      var colors = [topleftval, topmidval, topRightval, leftval, centerval, Rightval, bottomLeftval, bottomCenterval, bottomRightval];

      //    console.log(colors)

      var rgbColors = colors.filter(x => isValidColor(x !== undefined && typeof x === 'string' ? x : "")).map(hexToRgb);

      // Calculate the mean RGB components
      var totalR = 0;
      var totalG = 0;
      var totalB = 0;

      rgbColors.forEach(color => {
        totalR += color.r;
        totalG += color.g;
        totalB += color.b;
      });
      var avgR = Math.round(totalR / rgbColors.length);
      var avgG = Math.round(totalG / rgbColors.length);
      var avgB = Math.round(totalB / rgbColors.length);

      // Convert mean RGB components back to hexadecimal color
      var averageColor = rgbToHex(avgR, avgG, avgB);

      // console.log(averageColor); 

      document.getElementById(`${index}`)?.setAttribute('fill', averageColor);
      //document.getElementById(`${index}`)?.setAttribute('fill',getRandomColorHotorCold());

    

  }


  const HandleCompleteRamdomization = async () => {
    for (let index = 0; index < Circles.length; index++) {
      // Adjust delay time as needed
      document.getElementById(`${index}`)?.setAttribute('fill', getRandomColor());
    }
  };

  const HandleHotOrColdRandomization = async () => {
    for (let index = 0; index < Circles.length; index++) {
      // Adjust delay time as needed
      document.getElementById(`${index}`)?.setAttribute('fill', getRandomColorHotorCold());
    }
  };

  const HandleClick = (e: any) => {
    !BrushOrClick && e.target.setAttribute('fill', currentColor)
  }

  const ClearGrid = () => {
    Circles?.map((item: JSX.Element) => {
      document.getElementById(item.props.id)?.setAttribute('fill', 'black')
    })
  }


  function DrawGrid() {
    var squareSize = 40 < 20 ? 20 : 40
    var screenWidth = window.innerWidth;
    var screenHeight = window.innerHeight;
    var num = 0;
    var squaresPerRow = Math.floor(screenWidth / squareSize);
    var SquaresPerColumn = Math.floor(screenHeight / squareSize);
    const GridSquares: JSX.Element[] = [];
    for (let j = 0; j < SquaresPerColumn + 2; j++) {
      for (let i = 0; i < squaresPerRow + 2; i++) {
        GridSquares.push(
          <rect id={`${num}`} onMouseOver={handleMouseOver} onClick={HandleClick}  fill={'#000'} stroke={"#111"} width={`${squareSize}px`} height={`${squareSize}px`} x={`${squareSize * i}px`} y={`${j * squareSize}px`} />
        );
        num += 1;
      }
    }
    SetColCount(SquaresPerColumn)
    SetRowCount(squaresPerRow)
    SetCircles(GridSquares);
  }

  const handleChangeComplete = (color: string) => {
    SetCurrentColor(color.hex);
  };

  const start = () => {
    DrawGrid()
  }

  React.useEffect(() => {
    DrawGrid()
    // window.addEventListener('resize', DrawGrid);
    // return () => {
    //   window.removeEventListener('resize', DrawGrid);
    // };
  }, [currentColor, BrushOrClick, mouseDown])

  return (
    <div onMouseDown={() => SetMouseDown(true)} onMouseUp={() => SetMouseDown(false)} style={{ backgroundColor: "#000", height: "100vh", width: "100vw" }}>
      <div style={{ padding: "5px", gap: "10px", flexDirection: "row", display: "flex", border: "1px solid #555", zIndex: 1, justifyContent: "center", position: "absolute", backgroundColor: "#000" }}>

        <div style={{ cursor: "pointer", flexDirection: "column", display: "flex" }}>
          <button onClick={sortColors} style={{ border: "1px solid #444", outline: "none", cursor: "pointer", borderRadius: "2px", width: "200px", fontFamily: '"Ubuntu Mono", monospace', backgroundColor: "#333", color: "#000", fontWeight: "0" }}>        <h4 style={{ fontFamily: '"Ubuntu Mono", monospace', margin: "0", color: "#fff" }}>Sort Color</h4></button>
        </div>
        <div style={{ cursor: "pointer", flexDirection: "column", display: "flex" }}>
          <button onClick={HandleCompleteRamdomization} style={{ border: "1px solid #444", outline: "none", cursor: "pointer", borderRadius: "2px", width: "200px", fontFamily: '"Ubuntu Mono", monospace', backgroundColor: "#333", color: "#000", fontWeight: "0" }}>        <h4 style={{ fontFamily: '"Ubuntu Mono", monospace', margin: "0", color: "#fff" }}>Random Color</h4></button>
        </div>

        <div style={{ cursor: "pointer", flexDirection: "column", display: "flex" }}>
          <button onClick={HandleHotOrColdRandomization} style={{ border: "1px solid #444", outline: "none", cursor: "pointer", borderRadius: "2px", width: "200px", fontFamily: '"Ubuntu Mono", monospace', backgroundColor: "#333", color: "#000", fontWeight: "0" }}>        <h4 style={{ fontFamily: '"Ubuntu Mono", monospace', margin: "0", color: "#fff" }}>Random Hot-or-Cold</h4></button>
        </div>
        <div style={{ cursor: "pointer", flexDirection: "column", display: "flex" }}>
          <button onClick={(e)=>{SetSmoothTool(!SmoothToolSet)}} style={{  border: SmoothToolSet ?  "2px solid #fff":  "1px solid #444", outline: "none", cursor: "pointer", borderRadius: "2px", width: "200px", fontFamily: '"Ubuntu Mono", monospace', backgroundColor: "#333", color: "#000", fontWeight: "0" }}>        <h4 style={{ fontFamily: '"Ubuntu Mono", monospace', margin: "0", color: "#fff" }}>smooth</h4></button>
        </div>
        <div style={{ cursor: "pointer", flexDirection: "column", display: "flex" }}>
          <button onClick={ClearGrid} style={{ border: "1px solid #444", outline: "none", cursor: "pointer", borderRadius: "2px", width: "200px", fontFamily: '"Ubuntu Mono", monospace', backgroundColor: "#333", color: "#000", fontWeight: "0" }}>        <h4 style={{ fontFamily: '"Ubuntu Mono", monospace', margin: "0", color: "#fff" }}>Clear</h4></button>
        </div>
        <div style={{ padding: "5px", cursor: "pointer", flexDirection: "column", display: "flex", width: "90%", height: "90%" }}>
          {BrushOrClick ? <TbClick onClick={() => SetBrushOrClick(false)} style={{ color: "#eee", height: "30px", width: "30px" }} />
            :
            <LuPaintbrush onClick={() => SetBrushOrClick(true)} style={{ color: "#eee", height: "30px", width: "30px" }} />
          }
        </div>
        <div style={{ padding: "5px", cursor: "pointer", flexDirection: "column", display: "flex", width: "90%", height: "90%" }}>
          <div style={{ backgroundColor: currentColor, width: "30px", height: "30px" }}>
          </div>
        </div>
        <div style={{ padding: "5px", cursor: "pointer", flexDirection: "column", display: "flex", width: "90%", height: "90%" }}>
          <IoIosColorPalette onClick={() => { setColorOpen(!colorOpen) }} style={{ color: "#eee", height: "30px", width: "30px" }} />
          {colorOpen &&
            <div onMouseLeave={(e)=>{setColorOpen(false)}} onDoubleClick={() => { setColorOpen(!colorOpen) }} style={{ overflow: "auto", padding: "20px", gap: "30px", flexDirection: "column", display: "flex", position: "absolute", visibility: "visible", backgroundColor: "#000", border: "1px solid #555", zIndex: 1 }}>
              <HuePicker color={currentColor} onChangeComplete={handleChangeComplete} />
              <CirclePicker width={'100%'} color={currentColor} onChangeComplete={handleChangeComplete} />
              <div style={{ width: "100%", justifyContent: "Right", display: "flex", flexDirection: "row" }}>
                
              </div>
            </div>
          }
        </div>
        
      </div>
      <svg onWheel={handleWheel} style={{ position: "absolute" }} width="100vw" height="100vh" >
        {Circles}
      </svg>
    </div>

  )
}

export default App


