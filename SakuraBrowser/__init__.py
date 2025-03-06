import sys
import os
from PyQt5.QtWidgets import QApplication, QMainWindow, QToolBar, QLineEdit, QAction
from PyQt5.QtCore import QUrl, Qt, QStandardPaths
from PyQt5.QtWebEngineWidgets import QWebEngineView, QWebEngineProfile
from PyQt5.QtWebEngineCore import QWebEngineDownloadItem  # Новое имя класса

class BrowserWindow(QMainWindow):
    def __init__(self, download_dir=None, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.download_dir = download_dir or QStandardPaths.writableLocation(
            QStandardPaths.DownloadLocation)
        
        # Create web view
        self.web_view = QWebEngineView()
        self.setCentralWidget(self.web_view)
        
        # Setup navigation toolbar
        nav_toolbar = QToolBar()
        self.addToolBar(nav_toolbar)
        
        # Back button
        back_btn = QAction("←", self)
        back_btn.triggered.connect(self.web_view.back)
        nav_toolbar.addAction(back_btn)
        
        # Forward button
        forward_btn = QAction("→", self)
        forward_btn.triggered.connect(self.web_view.forward)
        nav_toolbar.addAction(forward_btn)
        
        # Refresh button
        refresh_btn = QAction("↻", self)
        refresh_btn.triggered.connect(self.web_view.reload)
        nav_toolbar.addAction(refresh_btn)
        
        # URL bar
        self.url_bar = QLineEdit()
        self.url_bar.returnPressed.connect(self.navigate_to_url)
        nav_toolbar.addWidget(self.url_bar)
        
        # Setup downloads
        profile = QWebEngineProfile.defaultProfile()
        profile.downloadRequested.connect(self.handle_download)
        
        # Window settings
        self.setWindowTitle("Python Browser")
        self.resize(1024, 768)

    def navigate_to_url(self):
        url = self.url_bar.text()
        if not url.startswith(("http://", "https://")):
            url = "https://" + url
        self.web_view.setUrl(QUrl(url))

    def handle_download(self, download: QWebEngineDownloadItem):
        download.finished.connect(lambda: print("Download completed!"))
        download_path = os.path.join(self.download_dir, download.path())
        download.setPath(download_path)
        download.accept()
        
        # Start download
        download.accept()
        
        print(f"Downloading to: {download_path}")

    def load_url(self, url):
        self.web_view.setUrl(QUrl(url))
        self.url_bar.setText(url)

def open_browser(url, download_dir=None):
    app = QApplication(sys.argv)
    
    browser = BrowserWindow(download_dir=download_dir)
    browser.load_url(url)
    browser.show()
    
    sys.exit(app.exec_())

if __name__ == "__main__":
    # Пример использования
    open_browser(
        url="https://google.com",
        download_dir=os.path.join(os.path.expanduser("~"), "Downloads/py_downloads")
    )