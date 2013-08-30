#!/usr/bin/env python

from Browser import *
import os
import sys
import urllib
import locale

import cefpython3.wx.chromectrl as chrome
    

#import gobject

class DataPoolClass():
    def __init__(self):
        self.zacContent=""
        self.mestreContent=""
        self.resourceContent=""
        self.netConnection=False
        pass
    
    def getZacContent(self):
        return self.zacContent;
        pass
    
    def setZacContent(self, content):
        self.zacContent=content;
        pass
    
    def getMestreContent(self):
        return self.mestreContent;
        pass
    
    def setMestreContent(self, content):
        self.mestreContent=content;
        pass
    
    def getRecursosContent(self):
        return self.resourceContent;
        pass
    
    def setRecursosContent(self, content):
        self.resourceContent=content;
        pass
    
    def SetNetworkAvailability(self, status):
        self.netConnection=status
        pass
    
    def GetNetworkAvailability(self):
        return self.netConnection
    
    

class llxResourceBrowser:
    language=locale.getdefaultlocale()[0] # Gettins system language
    
    # Init Bindings
    binding={}
    binding[("zac", "home")] = 'onHomeZac';
    
    def __init__(self):
        ''' just an init method '''
        
        pass

    def on_navigation_requested(self, view, frame, req, data=None):
        ''' Procedure that routes the webkit navigation request '''
        
        uri = req.get_uri()
        url=uri.split(':')
        scheme=url[0]
        args=url[1].split('/')
        function=args[2]
        
        if (scheme, function) in self.binding:
            eval("self."+self.binding[(scheme, function)])(args)
            return True
                        
        return False

def readRscDesktops():
        import os
        CatDict={"Infantil":[], "Secundaria":[], "EduEspecial":[]}
        listing = os.listdir("/usr/share/applications")
        
        xml="<categories>"
        
        for infile in listing:
            if(infile[-7:]=="desktop"):
                #print "current file is: " + infile
                with open("/usr/share/applications/"+infile) as f:
                    exefile=""
                    name=""
                    cat=""
                    icon=""
                    
                    #print "FILE: "+"/usr/share/applications/"+infile
                    for line in f:
                        #print line[0:5]
                        #print line[0:11]
                        if(line[0:5]=="Exec="):                            
                       #     print "    >"+line
                            if ("htm" in line):
                                exefile=line[line.find("/"):-1]
                                
                                # Parsing line to find route...
                                
                            #    print "    >"+line
                        elif(line[0:5]=="Icon="):
                            if ("/" in line):
                                icon=line[5:-1]
                            else:
                                icon="images/icons/package-x-lliurex-resource.png"
                            
                            
                        elif(line[0:11]=="Categories="):
                            if ("LliureX-Infantil" in line):
                                cat="Infantil"
                            elif("LliureX-Educacion-Especial" in line):
                                cat="EduEspecial"
                            elif("LliureX-Secundaria" in line):
                                cat="Secundaria"
                                
                        elif (line[0:5]=="Name="):
                            name=line[5:-1]
                            #print "    >"+line
                    
                    if(name!="" and exefile!="" and cat!=""): # Good! Let's add the rsc
                        CatDict[cat].append({"Name":name, "Exec":exefile, "Icon":icon})
                        
                        #print "NAME:"+name
                        #print "EXE:"+exefile
                        #print "ICON:"+icon
                        #print "CAT:"+cat
        
        
        if(len(CatDict["Infantil"])>0):
            xml=xml+"<category> \n\
                <name>Infantil i Primaria</name> \n\
                <icon>images/icons/cat_primaria.png</icon> \n\
                <highres></highres> <lowres></lowres> <visible>0</visible> \n\
                <background>llx.png</background> \n\
                <websites>\n"
            for site in CatDict["Infantil"]:
                xml=xml+"<website>\n"
                xml=xml+"<name>"+site["Name"]+"</name>\n"
                xml=xml+"<url>file:///"+site["Exec"]+"</url>\n"
                xml=xml+"<icon>"+site["Icon"]+"</icon>\n"
                xml=xml+"<type>1</type>\n<allow>*</allow>\n<restriction>*</restriction>\n \
                    <helpurl>http://</helpurl>\n<visible>on</visible>\n<safecontent>yes</safecontent>"
                xml=xml+"</website>\n"
                
                
            xml=xml+"</websites>\n"
        xml=xml+"</categories>\n"

        return xml
        pass
    
def net_available():
    import urllib2
    try:
        response=urllib2.urlopen('http://www.google.es',timeout=2)
        return True
    except urllib2.URLError as err: pass
    return False

if __name__ == "__main__":
    
    import json
        
    # set working directory
    conffile=open('/etc/llx-resource-browser/settings.json')
    myjson=conffile.read()
    dic=json.loads(myjson)
    print ("Reading App from: "+dic["globalSettings"]["app_dir"])

    os.chdir(dic["globalSettings"]["app_dir"])
    
    
    chrome.Initialize()
    print('llx-resource-browswer.py: wx.version=%s' % wx.version())
    
    
    
    # Getting Data ##############################################
    DataPool=DataPoolClass()
    
    try: # LliureX Recursos Resources
        recursosxmlfile=readRscDesktops()
    except Exception as e:
        print ("Except: "+str(e))
        recursosxmlfile=""
        pass
        
    try: # Zac browser resources
        zacfile = open('webgui/zac.xml', 'r')
        zacxmlfile=zacfile.read()
    except Exception as e:
        print ("Except: "+str(e))
        zacxmlfile=""
        pass
        
    try: # Mestre a Casa Resources
        mestrefile = open('webgui/mestreacasa.xml', 'r')
        mestrexmlfile=mestrefile.read()
    except Exception as e:
        print ("Except: "+str(e))
        mestrexmlfile=""
        pass
    
    # Check Network............
    if(net_available()):
        print "Network Connection is Available"
        DataPool.SetNetworkAvailability(True)
        
    else:
        print "Network Connection is not Available"
        DataPool.SetNetworkAvailability(False)
    # End Check Network............... 
        
    DataPool.setZacContent(urllib.pathname2url(zacxmlfile))
    DataPool.setRecursosContent(urllib.pathname2url(recursosxmlfile))
    DataPool.setMestreContent(urllib.pathname2url(mestrexmlfile))
    
    
    ### End getting data #########################################
    
    #MyStartScreen.remove();
    
    #file = os.path.abspath('webgui/index.html')
    file = os.path.abspath('webgui/menu.html')
    uri = 'file://' + urllib.pathname2url(file)
    
    app = wx.PySimpleApp()
    ResourceBrowser=MyBrowser(uri, DataPool)
    ResourceBrowser.Show()
    
    
    ## vell uri = 'file://' + urllib.pathname2url(file)+'?file='+xmlfile
    ## per provar xss uri='http://hosting.gmodules.com/ig/gadgets/file/112581010116074801021/treefrog.swf'
    #uri='http://hosting.gmodules.com/ig/gadgets/file/112581010116074801021/treefrog.swf'
    #uri='file:///home/joamuran/Desktop/treefrog.swf'
    
    #print ("Goint to "+uri)
    #ResourceBrowser.open_url(uri)
    #ResourceBrowser.Show()
    
    # send parameters...
    # load file zac...
    
    
    #ResourceBrowser.execute_script("aaa='"+xmlfile+"'")
    #ResourceBrowser.execute_script("start('"+urllib.pathname2url(xmlfile)+"')")
    #ResourceBrowser.cefWindow.browser.GetMainFrame().ExecuteJavascript("document.start('"+urllib.pathname2url(xmlfile)+"')")
    #ResourceBrowser.cefWindow.browser.GetMainFrame().ExecuteJavascript("alert(document.scripts[0])")
    #ResourceBrowser.cefWindow.browser.GetMainFrame().ExecuteJavascript("alert(document.getElementsByTagName('function').length)")
    #ResourceBrowser.execute_script("alert('perico')")
    #ResourceBrowser.cefWindow.browser.GetMainFrame().ExecuteJavascript("alert('perico')")
    
    
    
    app.MainLoop()
    # Important: do the wx cleanup before calling Shutdown.
    del app
    chrome.Shutdown()
    
'''if __name__ == "__main__":
    import json
    # set working directory
    conffile=open('/etc/llx-resource-browser/settings.json')
    myjson=conffile.read()
    dic=json.loads(myjson)
    print ("Reading App from: "+dic["globalSettings"]["app_dir"])

    os.chdir(dic["globalSettings"]["app_dir"])

    # Create an App instance
    rscBrowser = llxResourceBrowser()
    
    # create Browser
    #browser = Browser(language=rscBrowser.language)   
    
    browser = Browser()
    
    browser.connectEvents("navigation-requested", rscBrowser.on_navigation_requested)
    
    # load file zac...
    
    try:
        zacfile = open('webgui/zac.xml', 'r')
        #zacfile = open('webgui/recursos.xml', 'r')
        
        xmlfile=zacfile.read()
    except Exception as e:
        print ("Except: "+str(e))
        pass
        
    
    
    #file = os.path.abspath('webgui/index.html')
    file = os.path.abspath('webgui/menu.html')
    
    
    uri = 'file://' + urllib.pathname2url(file)    
    ## vell uri = 'file://' + urllib.pathname2url(file)+'?file='+xmlfile
    ## per provar xss uri='http://hosting.gmodules.com/ig/gadgets/file/112581010116074801021/treefrog.swf'
    #uri='http://hosting.gmodules.com/ig/gadgets/file/112581010116074801021/treefrog.swf'
    #uri='file:///home/joamuran/Desktop/treefrog.swf'
    uri='http://www.google.es'
    
    #uri='http://www.google.es'
   
    ## print ("Goint to "+uri)
  #  print (uri)
  #  browser.open_url(uri)
    # send parameters...
    #browser.execute_script("aaa='"+xmlfile+"'")
    # per executar l'script que passa els parametres  #browser.execute_script("aaa='"+urllib.pathname2url(xmlfile)+"'")
    print (">>"+browser.lang)
    
    Gtk.main()
'''