from tkinter import *

root = Tk()
root.geometry("350x350")
root.title("Калькулятор")
root.config(bg="#FFF8DC")

expression = ""

def click(number):
    global expression
    expression += str(number)
    entry.delete(0, END)
    entry.insert(0, expression)

def clear():
    global expression
    expression = ""
    entry.delete(0, END)

def count():
    global expression
    result = str(eval(expression)) # eval вычесление строк
    entry.delete(0, END)
    entry.insert(0, result)
    expression = result

entry = Entry(root, font=('Arial', 16), bg="#FAEBD7")
entry.pack(pady=10)

frame = Frame(root, bg="#FFF8DC") # Прямоугольный регион на экране
frame.pack()

btn1 = Button(frame, text="1", width=5, height=2, bg='#AFEEEE', command=lambda: click(1)) # command=lambda: click(1) вызов функции клик для передачи цыфры 
btn1.pack(side=LEFT, padx=2, pady=2) 

btn2 = Button(frame, text="2", width=5, height=2, bg='#AFEEEE', command=lambda: click(2))
btn2.pack(side=LEFT, padx=2, pady=2)

btn3 = Button(frame, text="3", width=5, height=2, bg='#AFEEEE', command=lambda: click(3))
btn3.pack(side=LEFT, padx=2, pady=2)

btn_div = Button(frame, text="/", width=5, height=2, bg='#808080', command=lambda: click('/'))
btn_div.pack(side=LEFT, padx=2, pady=2)

frame2 = Frame(root, bg="#FFF8DC")# Прямоугольный регион на экране
frame2.pack()

btn4 = Button(frame2, text="4", width=5, height=2, bg='#AFEEEE', command=lambda: click(4))
btn4.pack(side=LEFT, padx=2, pady=2)

btn5 = Button(frame2, text="5", width=5, height=2, bg='#AFEEEE', command=lambda: click(5))
btn5.pack(side=LEFT, padx=2, pady=2)

btn6 = Button(frame2, text="6", width=5, height=2, bg='#AFEEEE', command=lambda: click(6))
btn6.pack(side=LEFT, padx=2, pady=2)

btn_mul = Button(frame2, text="*", width=5, height=2, bg='#808080', command=lambda: click('*'))
btn_mul.pack(side=LEFT, padx=2, pady=2)


frame3 = Frame(root, bg="#FFF8DC")# Прямоугольный регион на экране
frame3.pack()

btn7 = Button(frame3, text="7", width=5, height=2, bg='#AFEEEE', command=lambda: click(7))
btn7.pack(side=LEFT, padx=2, pady=2)

btn8 = Button(frame3, text="8", width=5, height=2, bg='#AFEEEE', command=lambda: click(8))
btn8.pack(side=LEFT, padx=2, pady=2)

btn9 = Button(frame3, text="9", width=5, height=2, bg='#AFEEEE', command=lambda: click(9))
btn9.pack(side=LEFT, padx=2, pady=2)

btn_sub = Button(frame3, text="-", width=5, height=2, bg='#808080', command=lambda: click('-'))
btn_sub.pack(side=LEFT, padx=2, pady=2)

frame4 = Frame(root, bg="#FFF8DC")# Прямоугольный регион на экране
frame4.pack()

btn0 = Button(frame4, text="0", width=5, height=2, bg='#AFEEEE', command=lambda: click(0))
btn0.pack(side=LEFT, padx=2, pady=2)

btn_clear = Button(frame4, text="Пог", width=5, height=2, bg='#808080', fg='white', command=clear)
btn_clear.pack(side=LEFT, padx=2, pady=2)

btn_equal = Button(frame4, text="=", width=5, height=2, bg='#808080', command=count)
btn_equal.pack(side=LEFT, padx=2, pady=2)

btn_add = Button(frame4, text="+", width=5, height=2, bg='#808080', command=lambda: click('+'))
btn_add.pack(side=LEFT, padx=2, pady=2)

frame5 = Frame(root, bg="#FFF8DC")# Прямоугольный регион на экране
frame5.pack()

btn = Button(frame5, text="Пог", width=5, height=2, bg='#808080', command=lambda: click('Пог'))
btn.pack(side=LEFT, padx=2, pady=2)

btn = Button(frame5, text="Пог", width=5, height=2, bg='#808080', command=lambda: click('Пог'))
btn.pack(side=LEFT, padx=2, pady=2)

btn = Button(frame5, text="Пог", width=5, height=2, bg='#808080', command=lambda: click('Пог'))
btn.pack(side=LEFT, padx=2, pady=2)

btn = Button(frame5, text="Пог", width=5, height=2, bg='#808080', command=lambda: click('Пог'))
btn.pack(side=LEFT, padx=2, pady=2)

root.mainloop()