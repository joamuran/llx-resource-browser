# Simple sample ilustrating the usage of CEFWindow class
# __author__ = "Greg Kacy <grkacy@gmail.com>"

import os
import wx


import ctypes, sys
libcef_so = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'libcef.so')
if os.path.exists(libcef_so):
    # Import local module
    ctypes.CDLL(libcef_so, ctypes.RTLD_GLOBAL)
    if 0x02070000 <= sys.hexversion < 0x03000000:
        import cefpython_py27 as cefpython
    else:
        raise Exception("Unsupported python version: %s" % sys.version)
else:
    from cefpython3 import cefpython


import cefpython3.wx.chromectrl as chrome


class MyBindings():
    def __init__(self, win, DataPool):
        self.win=win
        self.DataPool=DataPool
        pass
    
    def getZacContent(self):
        data=self.DataPool.getZacContent();
        self.win.browser.GetMainFrame().ExecuteJavascript("start('"+data+"')")
        pass
    
    def getMestreContent(self):
        data=self.DataPool.getMestreContent();
        self.win.browser.GetMainFrame().ExecuteJavascript("start('"+data+"')")
        pass
    
    def getRecursosContent(self):
        data=self.DataPool.getRecursosContent();
        self.win.browser.GetMainFrame().ExecuteJavascript("start('"+data+"')")
        pass
    
    def GetNetworkAvailability(self):
        data=self.DataPool.GetNetworkAvailability();
        self.win.browser.GetMainFrame().ExecuteJavascript("start('"+str(data)+"')")
        pass
    
    
    '''def getContentList(self):
        self.win.browser.GetMainFrame().ExecuteJavascript("start('')")
        
        pass
    
    def getString(self, *args):
        print("Hellooo... getString Was THere")
        a=0
        for arg in args[1:]:
           a=a+int(arg)
        
        self.win.browser.GetMainFrame().ExecuteJavascript("start('hola"+str(a)+"')")
        pass
    
'''

class MyBrowser(wx.Frame):
    def __init__(self, uri, DataPool):
        wx.Frame.__init__(self, parent=None, id=wx.ID_ANY,
                          title='LliureX Resource Browser', size=wx.DisplaySize())
        self.icon = wx.Icon("/usr/share/icons/lliurex-neu/48/apps/box.png", wx.BITMAP_TYPE_PNG)
        self.SetIcon(self.icon)
                    
        wx.Frame.ShowFullScreen(self,True, style=wx.FULLSCREEN_ALL)



        self.cefWindow = chrome.ChromeWindow(self, url=uri, useTimer=True)
        #windowInfo = cefpython.WindowInfo()
        #windowInfo.SetAsChild(self.GetHandle())
        #self.cefWindow.browser = cefpython.CreateBrowserSync(windowInfo=None, browserSettings={}, navigateURL=uri)
    


        sizer = wx.BoxSizer(wx.VERTICAL)
        sizer.SetSizeHints(self)
        sizer.Add(self.cefWindow, 1, wx.EXPAND, 0)
        self.SetSizer(sizer)
        self.Fit()
        self.Show()
        
        
        #bindings = cefpython.JavascriptBindings(bindToFrames=True, bindToPopups=True)
        
        
        #bindings = cefpython.JavascriptBindings(bindToFrames=False, bindToPopups=True)
        #bindings.SetFunction("getString", self.getString)
        #self.cefWindow.browser.SetJavascriptBindings(bindings)
        
        
        self.MyBindingsObject=MyBindings(self.cefWindow, DataPool)
        bindings = cefpython.JavascriptBindings(bindToFrames=False, bindToPopups=True)
        bindings.SetObject("MyBindings", self.MyBindingsObject)
        self.cefWindow.browser.SetJavascriptBindings(bindings)
        
        
        self.Bind(wx.EVT_CLOSE, self.OnClose)
    
    def execute_script(self, to_execute):
        self.cefWindow.browser.GetMainFrame().ExecuteJavascript(to_execute)
        pass
    

    def OnClose(self, event):
        self.Destroy()

    '''def open_url(self, uri):
        self.cefWindow = chrome.ChromeWindow(self,
                url=os.path.join(os.path.dirname(os.path.abspath(__file__)),uri))
    
        sizer = wx.BoxSizer(wx.VERTICAL)
        sizer.SetSizeHints(self)
        
        sizer.Add(self.cefWindow, 100, wx.EXPAND)
        self.SetSizer(sizer)
        self.Show()

        pass
    '''

    def getString(self):
        print("Hello... getString Was THere")
        return({"aa"})
        pass
    

'''if __name__ == '__main__':
    chrome.Initialize()
    print('sample1.py: wx.version=%s' % wx.version())
    app = wx.PySimpleApp()
    Browser().Show()
    app.MainLoop()
    # Important: do the wx cleanup before calling Shutdown.
    del app
    chrome.Shutdown()

'''