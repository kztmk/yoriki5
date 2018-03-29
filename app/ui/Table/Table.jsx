// @flow
import React from 'react';
import cx from 'classnames';

// material-ui components
import withStyles from 'material-ui/styles/withStyles';
import Table from 'material-ui/Table';
import TableBody from 'material-ui/Table/TableBody';
import TableCell from 'material-ui/Table/TableCell';
import TableHead from 'material-ui/Table/TableHead';
import TableRow from 'material-ui/Table/TableRow';

import tableStyle from '../../asets/jss/material-dashboard-pro-react/components/tableStyle';


/* eslint-disable react/require-default-props */
export type Props = {
  classes: Object,
  tableHeaderColor?: 'warning' | 'primary' | 'danger' | 'success' | 'info' | 'rose' | 'gray',
  tableHead?: Array<string>,
  // Of(PropTypes.arrayOf(PropTypes.node)) || Of(PropTypes.object),
  tableData?: Array<any>,
  hover?: boolean,
  coloredColls?: Array<number>,
  // Of(["warning","primary","danger","success","info","rose","gray"]) - colorsColls
  colorsColls?: Array<any>,
  customCellClasses?: Array<string>,
  customClassesForCells?: Array<number>,
  customHeadCellClasses?: Array<string>,
  customHeadClassesForCells?: Array<number>,
  striped?: boolean,
  // this will cause some changes in font
  tableShopping?: boolean
};

function CustomTable(props: Props) {
  const {
    classes,
    tableHead,
    tableData,
    tableHeaderColor,
    hover,
    colorsColls,
    coloredColls,
    customCellClasses,
    customClassesForCells,
    striped,
    tableShopping,
    customHeadCellClasses,
    customHeadClassesForCells
  } = props;
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor]}>
            <TableRow className={classes.tableRow}>
              {tableHead.map((prop, key) => {
                const tableCellClasses =
                  `${classes.tableHeadCell
                  } ${
                  classes.tableCell
                  } ${
                  cx({
                    [customHeadCellClasses[
                      customHeadClassesForCells.indexOf(key)
                    ]]:
                      customHeadClassesForCells.indexOf(key) !== -1,
                    [classes.tableShoppingHead]: tableShopping,
                    [classes.tableHeadFontSize]: !tableShopping
                  })}`;
                return (
                  <TableCell className={tableCellClasses} key={key}>
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.map((prop, key) => {
            let rowColor = '';
            let rowColored = false;
            if (prop.color !== undefined) {
              rowColor = prop.color;
              rowColored = true;
              prop = prop.data;
            }
            const tableRowClasses = cx({
              [classes.tableRowHover]: hover,
              [classes[`${rowColor}Row`]]: rowColored,
              [classes.tableStripedRow]: striped && key % 2 === 0
            });
            if (prop.total) {
              return (
                <TableRow key={key} hover={hover} className={tableRowClasses}>
                  <TableCell
                    className={classes.tableCell}
                    colSpan={prop.colspan}
                  />
                  <TableCell
                    className={`${classes.tableCell} ${classes.tableCellTotal}`}
                  >
                    Total
                  </TableCell>
                  <TableCell
                    className={
                      `${classes.tableCell} ${classes.tableCellAmount}`
                    }
                  >
                    {prop.amount}
                  </TableCell>
                  {
                    tableHead.length - (prop.colspan - 0 + 2) > 0 ? (
                      <TableCell
                        className={classes.tableCell}
                        colSpan={tableHead.length - (prop.colspan - 0 + 2)}
                      />
                    ) : null
                  }
                </TableRow>
              );
            }
            if (prop.purchase) {
              return (
                <TableRow key={key} hover={hover} className={tableRowClasses}>
                  <TableCell
                    className={classes.tableCell}
                    colSpan={prop.colspan}
                  />
                  <TableCell
                    className={`${classes.tableCell} ${classes.right}`}
                    colSpan={prop.col.colspan}
                  >
                    {prop.col.text}
                  </TableCell>
                </TableRow>
              );
            }
            return (
              <TableRow key={key} hover={hover} className={`${classes.tableRow} ${tableRowClasses}`}>
                {prop.map((prop, key) => {
                  const tableCellClasses =
                    `${classes.tableCell
                    } ${
                    cx({
                      [classes[colorsColls[coloredColls.indexOf(key)]]]:
                        coloredColls.indexOf(key) !== -1,
                      [customCellClasses[customClassesForCells.indexOf(key)]]:
                        customClassesForCells.indexOf(key) !== -1,
                    })}`;
                  return (
                    <TableCell className={tableCellClasses} key={key}>
                      {prop}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: 'gray',
  hover: false,
  colorsColls: [],
  coloredColls: [],
  striped: false,
  customCellClasses: [],
  customClassesForCells: [],
  customHeadCellClasses: [],
  customHeadClassesForCells: []
};

export default withStyles(tableStyle)(CustomTable);
