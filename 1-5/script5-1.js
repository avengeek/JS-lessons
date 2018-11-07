"use strict";

const settings = {
  lightColor: '#d0d0d0',
  darkColor: '#993300',
  letters: ['','a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',''],
}

/**
 * @property {HTMLElement} gameContainerEl Контейнер игры (DOM элемент).
 */
const chess = {
  settings,
  gameContainerEl: document.getElementById('game'),

  figures: [
// белые фигуры
  {name: 'R', color: 'w', pos: 'a1'},
  {name: 'N', color: 'w', pos: 'b1'},
  {name: 'B', color: 'w', pos: 'c1'},
  {name: 'Q', color: 'w', pos: 'd1'},
  {name: 'K', color: 'w', pos: 'e1'},
  {name: 'B', color: 'w', pos: 'f1'},
  {name: 'N', color: 'w', pos: 'g1'},
  {name: 'R', color: 'w', pos: 'h1'},
  {name: 'p', color: 'w', pos: 'a2'},
  {name: 'p', color: 'w', pos: 'b2'},
  {name: 'p', color: 'w', pos: 'c2'},
  {name: 'p', color: 'w', pos: 'd2'},
  {name: 'p', color: 'w', pos: 'e2'},
  {name: 'p', color: 'w', pos: 'f2'},
  {name: 'p', color: 'w', pos: 'g2'},
  {name: 'p', color: 'w', pos: 'h2'},

// черные фигуры
  {name: 'R', color: 'b', pos: 'a8'},
  {name: 'N', color: 'b', pos: 'b8'},
  {name: 'B', color: 'b', pos: 'c8'},
  {name: 'Q', color: 'b', pos: 'd8'},
  {name: 'K', color: 'b', pos: 'e8'},
  {name: 'B', color: 'b', pos: 'f8'},
  {name: 'N', color: 'b', pos: 'g8'},
  {name: 'R', color: 'b', pos: 'h8'},
  {name: 'p', color: 'b', pos: 'a7'},
  {name: 'p', color: 'b', pos: 'b7'},
  {name: 'p', color: 'b', pos: 'c7'},
  {name: 'p', color: 'b', pos: 'd7'},
  {name: 'p', color: 'b', pos: 'e7'},
  {name: 'p', color: 'b', pos: 'f7'},
  {name: 'p', color: 'b', pos: 'g7'},
  {name: 'p', color: 'b', pos: 'h7'},
  ],

  figureHtml: {
    Kw: '&#9812;', // белый король
    Qw: '&#9813;', // белый ферзь
    Bw: '&#9815;', // белый слон
    Nw: '&#9816;', // белый конь
    Rw: '&#9814;', // белая ладья
    pw: '&#9817;', // белая пешка

    Kb: '&#9818;', // черный король
    Qb: '&#9819;', // черный ферзь
    Bb: '&#9821;', // черный слон
    Nb: '&#9822;', // черный конь
    Rb: '&#9820;', // черная ладья
    pb: '&#9823;', // черная пешка
  },

 /**
  * Метод для вывода фигур.
  */
  renderFigure() {
    for (var i = 0; i < this.figures.length; i++) {
      // Получаем имя фигуры и цвет в одну строку.
      const figureHtmlProperty = this.figures[i].name + this.figures[i].color;
      // Получаем код фигуры из this.figureHtml используя строку из названия фигуры и ее цвета.
      const figureCode = this.figureHtml[figureHtmlProperty];
      // Выводим ее в ячейку.
      document.getElementById(this.figures[i].pos).innerHTML = figureCode;
    };
  },

  /**
   * Метод отображения карты (игрового поля).
   */
  renderMap() {
    for (let i = 9; i >= 0; i--) {
      const trElem = document.createElement('tr');
      this.gameContainerEl.appendChild(trElem);
      for (let j = 0; j < 10; j++) {
        const tdElem = document.createElement('td');
        // заполняем уникальный идентификатор у каждой клетки игрового поля.
        tdElem.id = this.settings.letters[j]+i;
        // раскрашиваем поле.
        if (this.isCellIsBlack(i, j)) {
          tdElem.style.backgroundColor = this.settings.darkColor;
        } else {
          tdElem.style.backgroundColor = this.settings.lightColor;
        }
        // заполняем крайние клетки поля обозначениями.
        tdElem.innerHTML = this.boardSigns(i, j, tdElem.id);
        trElem.appendChild(tdElem);
      }
    }
  },

  /**
   * Определяет является ли ячейка черной.
   * @param {int} rowNum Номер в строке.
   * @param {int} colNum Номер в колонке.
   * @returns {boolean} true, если ячейка должна быть черной, иначе false.
   */
  isCellIsBlack(rowNum, colNum) {
    if (rowNum === 0 || rowNum === 9 || colNum === 0 || colNum === 9) {
      return false;
    } else {
      return !((rowNum + colNum) % 2);
    }
  },

  /**
  * Присваивает значения по границам поля.
   * @param {int} rowNum Номер в строке.
   * @param {int} colNum Номер в колонке.
   * @param {string} id идентификатор клетки.
   * @returns {string} код для вставки в символьное обозначение поля.
  */
  boardSigns(rowNum, colNum, id) {
    if ((id === '0') || (id === '9')) {
      return '';
    } else if (rowNum === 0 || rowNum === 9) {
      return '&#'+(96+colNum);
    } else if (colNum === 0 || colNum === 9) {
      return '&#'+(48+rowNum);
    } else {
      return '';
    }
    },

    /**
    * Потенциальная возможность передвигать фигуры.
    * Конечно это не лучшая реализация. Думаю правильно было бы изменять координаты фигуры в таблице, а потом перерисовывать поле figures.
    */
    figureMove(startPos, finishPos) {
        let start = document.getElementById(startPos);
        let finish = document.getElementById(finishPos);
      if (start.innerHTML === '') {
        alert('Ошибка! В клетке нет фигуры.');
      } else if (startPos === finishPos) {
        alert('Ошибка! Вы не походили.');
      } else {
        finish.innerHTML = start.innerHTML;
        start.innerHTML = '';
      }
    },
};

// Запускаем метод отображения карты.
chess.renderMap();

// Вызовем метод демонстрации получения кода фигуры и ее вывод.
chess.renderFigure();

//передаём в объект координаты начального и конечного поля передвижения фигуры.
function moveFig() {
  let a = (document.getElementById("startPos").value);
  let b = (document.getElementById("finishPos").value);
  chess.figureMove(a, b);
}
document.getElementById("move").onclick = moveFig;
