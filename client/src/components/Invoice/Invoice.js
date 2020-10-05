import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import SaveIcon from "@material-ui/icons/Save";
import { withStyles } from "@material-ui/core/styles";
import { getAccounts, saveBill, getBills } from "../../actions/customerActions";
import LineItems from "./LineItems";
import styles from "./Invoice.module.scss";
import uuidv4 from "uuid/v4";

class Invoice extends Component {
  componentDidMount() {
    this.props.getAccounts();
    this.props.getBills(this.props.match.params.id);
    this.setState({
      invoiceNo: this.state.invoiceNo + 2 - 1,
    });
  }
  async UNSAFE_componentWillReceiveProps() {
    let date = new Date();
    this.setState({
      invoiceDate: moment(date).format("L"),
    });
    this.props.customer.accounts.map((user) => {
      if (user._id === this.props.match.params.id) {
        this.setState({
          customerName: user.name,
        });
      }
    });
  }
  locale = "en-US";
  currency = "USD";

  state = {
    customerName: "",
    invoiceDate: "",
    invoiceNo: 0,
    lineItems: [
      {
        id: "initial", // react-beautiful-dnd unique key
        name: "",
        description: "",
        quantity: 0,
        price: 0.0,
        total: 0,
        date: "",
      },
    ],
  };

  handleInvoiceChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSave = () => {
    let customerId = this.props.match.params.id;
    const { customerName, invoiceDate, invoiceNo } = this.state;
    let billData = {
      customerName,
      invoiceDate,
      invoiceNo,
      customerId,
      lineItems: this.state.lineItems.map((item) => ({
        ...item,
        total: item.quantity * item.price,
      })),
    };
    this.props.saveBill(billData);
  };

  handleLineItemChange = (elementIndex) => (event) => {
    let lineItems = this.state.lineItems.map((item, i) => {
      if (elementIndex !== i) return item;
      return {
        ...item,
        [event.target.name]: event.target.value,
      };
    });
    this.setState({ lineItems });
  };

  handleAddLineItem = (event) => {
    this.setState({
      // use optimistic uuid for drag drop; in a production app this could be a database id
      lineItems: this.state.lineItems.concat([
        { id: uuidv4(), name: "", description: "", quantity: 0, price: 0.0 },
      ]),
    });
  };

  handleRemoveLineItem = (elementIndex) => (event) => {
    this.setState({
      lineItems: this.state.lineItems.filter((item, i) => {
        return elementIndex !== i;
      }),
    });
  };

  handleReorderLineItems = (newLineItems) => {
    this.setState({
      lineItems: newLineItems,
    });
  };

  handleFocusSelect = (event) => {
    event.target.select();
  };

  handlePayButtonClick = () => {
    alert("Not implemented");
  };

  formatCurrency = (amount) => {
    return new Intl.NumberFormat(this.locale, {
      style: "currency",
      currency: this.currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  calcTaxAmount = (c) => {
    return c * (this.state.taxRate / 100);
  };

  calcLineItemsTotal = () => {
    return this.state.lineItems.reduce(
      (prev, cur) => prev + cur.quantity * cur.price,
      0
    );
  };

  calcTaxTotal = () => {
    return this.calcLineItemsTotal() * (this.state.taxRate / 100);
  };

  calcGrandTotal = () => {
    return this.calcLineItemsTotal();
  };

  render = () => {
    const options = {};
    const ref = React.createRef();
    const { customerName, invoiceDate, invoiceNo, lineItems } = this.state;
    return (
      <>
        <div className={styles.invoice}>
          <div className={styles.companyName}>
            <h2>Company Name</h2>
          </div>
          <div>
            <div className={styles.row}>
              <div className={styles.invoiceNo}>
                <span>Invoice No:</span>
                <input
                  className={styles.inputBox}
                  type="text"
                  placeholder="Invoice No"
                  value={invoiceNo}
                />
                <span className={styles.label1}>Date:</span>
                <input
                  className={styles.label}
                  type="text"
                  placeholder="Date"
                  value={invoiceDate}
                />
              </div>
            </div>
            <div className={styles.customer}>
              <span>Customer Name:</span>
              <input
                className={styles.custInput}
                type="text"
                placeholder="Customer Name"
                value={customerName}
              />
            </div>
          </div>
          <h2>Invoice</h2>

          <LineItems
            items={this.state.lineItems}
            q
            addHandler={this.handleAddLineItem}
            changeHandler={this.handleLineItemChange}
            focusHandler={this.handleFocusSelect}
            deleteHandler={this.handleRemoveLineItem}
            reorderHandler={this.handleReorderLineItems}
          />

          <div className={styles.totalContainer}>
            <form>
              <div className={styles.valueTable}>
                <div className={styles.row}>
                  <div className={styles.label}>Subtotal:-</div>
                  <div className={`${styles.value} ${styles.currency}`}>
                    {this.calcLineItemsTotal()}
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.label}>Total Due:-</div>
                  <div className={`${styles.value} ${styles.currency}`}>
                    {this.calcGrandTotal()}
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className={styles.saveItem}>
            <button type="button" onClick={this.handleSave}>
              <SaveIcon size="1.25em" className={styles.saveIcon} /> Save
            </button>
          </div>

          <div className={styles.footer}>
            <div className={styles.closing}>
              <div>Thank-you for your business</div>
            </div>
          </div>
        </div>
      </>
    );
  };
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  customer: state.customer,
  bills: state.bills,
});

export default withStyles(styles)(
  connect(mapStateToProps, { getAccounts, saveBill, getBills })(Invoice)
);
