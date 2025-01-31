import { useState } from 'react'
import './App.css'
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';
import Leftside from './components/Leftside';
import Rightside from './components/Rightside';
import Topbar from './components/Topbar';
import { Box } from '@mui/material';


function App() {
  const [count, setCount] = useState(0)

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh', }}>
      <Topbar />
      <PanelGroup direction="horizontal" style={{width: '100vw', height:'100%', display: 'flex' }}>
          <Panel defaultSize={50} minSize={5} className="upload-area" style={{ overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
              {/* <Upload /> Assuming Upload component does not need to scroll */}
              <Leftside /> {/* FileList will have the scrolling capability if it overflows */}
          </Panel>
          <PanelResizeHandle className="panel-resize-handle" />
          <Panel defaultSize={50} minSize={20} style={{ display: 'flex', flexDirection: 'column' }}>
              <Rightside />
          </Panel>
      </PanelGroup>
    </Box>
  )
}

export default App
