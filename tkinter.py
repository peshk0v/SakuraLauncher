from tkinter import *
from PIL import Image, ImageTk 
import json

themes = json.load(open("themes/themes.json"))
current_theme_config = json.load(open(f"themes/{themes['current']}/config.json"))
leftmenu_color = current_theme_config["left_color"]

root = Tk()
root.title("Приложение на Tkinter") 
root.geometry("1000x600")
root.resizable(width=False, height=False)

bgIMG = Image.open(f"themes/{themes['current']}/background.png")
bgIMG = bgIMG.resize((1000, 600))
bg = ImageTk.PhotoImage(bgIMG) 

BGlabel = Label(root, image = bg, width=1000) 
BGlabel.place(x = 0, y = 0) 

leftmenu = Label(root, font=("Arial", 20), height=600, width=25, bg=leftmenu_color)
leftmenu.pack(side=LEFT)

root.mainloop()