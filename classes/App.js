/**
 * @class App
 */
export default class App {
  constructor(root) {
    this.root = root;
    this.root.innerHTML = `
    <h3 class='title'>Sortable Table</h3>
    <table>
      <thead>
       <tr>${['Rank', 'Name', 'Age', 'Occupation'].map(n => `<th>${n}</th>`).join('')}</tr>
      </thead>
      <tbody>
       <tr>${['1', 'Dom', '35', 'Web Developer'].map(n => `<td>${n}</td>`).join('')}</tr>
       <tr>${['2', 'Rebecca', '29', 'Teacher'].map(n => `<td>${n}</td>`).join('')}</tr>
       <tr>${['3', 'John', '30', 'Civil Engineer'].map(n => `<td>${n}</td>`).join('')}</tr>
       <tr>${['4', 'Andre', '20', 'Dentist'].map(n => `<td>${n}</td>`).join('')}</tr>
      </tbody>
    </table>`;

    document.querySelectorAll('table th')
      .forEach(cell => cell.addEventListener('click', this.onClick));
  }

  /**
   * @function onClick - Table cell click event handler
   * @param target
   */
  onClick = ({ target }) => {
    const table = target.closest('table');
    const targetIndex = Array.prototype.indexOf.call(target.parentElement.children, target);
    const currentIsAscending = target.classList.contains('asc');
    this.sortTable(table, targetIndex, !currentIsAscending);
  };

  /**
   * @function sortTable - Sort table
   * @param table
   * @param column
   * @param asc
   */
  sortTable = (table, column, asc = true) => {
    const dir = asc ? 1 : -1;
    const body = table.tBodies[0];
    const rows = Array.from(body.querySelectorAll('tr'));

    // Sort each row
    const sortedRows = rows.sort((a, b) => {
      const columnA = a.querySelector(`td:nth-child(${column + 1})`).textContent.trim();
      const columnB = b.querySelector(`td:nth-child(${column + 1})`).textContent.trim();

      return columnA > columnB ? (1 * dir) : (-1 * dir);
    });

    // Remove all existing TRs from the table
    while (body.firstChild) {
      body.removeChild(body.firstChild);
    }

    // Re-add the newly sorted rows
    body.append(...sortedRows);

    // Remember how the column is currently sorted
    table.querySelectorAll('th').forEach(th => th.classList.remove('asc', 'desc'));
    table.querySelector(`th:nth-child(${column + 1})`).classList.toggle('asc', asc);
    table.querySelector(`th:nth-child(${column + 1})`).classList.toggle('desc', !asc);
  };
}



