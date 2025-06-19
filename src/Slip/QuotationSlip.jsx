import React from "react";
import "../Slip/Quotation.css";
import Logo from "../Assets/Images/mexCargo logo.png";
import { useEffect, useState } from "react";
import { BASE_URL } from "../config";

const QuotationSlip = () => {
  return (
    <>
      <div className="quotation-container">
        <header className="quotation-header">
          <img src={Logo} alt="MEX Services Logo" className="logo" />
          <h1>PACKERS AND MOVERS</h1>
          <h2>DOMESTIC AND INTERNATIONAL SERVICES</h2>
        </header>

        <section className="quotation-meta">
          <div>
            <p>
              <strong>Date:</strong> 3-May-24
            </p>
            <p>
              <strong>Ref No:</strong> 24BP101
            </p>
          </div>
          <div>
            <p>
              <strong>GSTIN:</strong> 22AEWPK4426L2Z3
            </p>
          </div>
        </section>

        <section className="quotation-to">
          <p>
            <strong>TO</strong>
          </p>
          <p>Rahul Barwe</p>
          <p>Bharat Petroleum Limited</p>
          <p>CG</p>
        </section>

        <section className="quotation-body">
          <p>
            We are pleased to offer you to join our family{" "}
            <strong>MEX SERVICES</strong>
            (PACKERS AND MOVERS Div.). We will safeguard your house holds for
            all the future ahead whenever required within city, within INDIA
            across the world.
          </p>
          <p>
            With a close consent to you, we are quoting for our package to
            relocate your
            <strong> HOUSEHOLD and CAR</strong> from <strong>Rampur</strong> to{" "}
            <strong>Punjab</strong> under our <strong>STANDARD</strong> package.
          </p>

          <table className="quotation-table">
            <thead>
              <tr>
                <th>S.N.</th>
                <th>Particulars</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {[
                "Packing,Loading,Unloading",
                "Packing,Loading,Unloading,Transportation",
                "Transportation Of House Hold Close Iron Body (12.5 MT) Container",
                "Transportation Of House Hold In Big Container 25MT Equivalent To Two Container (12.5 MT)",
                "Transportation Of Car (By Single Car Carrier Container)",
                "Transportation Of Car (By Shared Common Car carrier)",
                "Other Services",
                "Basic Amount",
                "Handy Man Services",
                "GST As Per GOVT Rule",
                "Transit Risk Coverage",
                " Risk Coverage Except Transit Insurance / FOV / @ 3% On Declared Value Of House Holds",
                " Risk Coverage Except Transit Insurance / FOV / @ 3% On Declared Value Of Car",
              ].map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item}</td>
                  <td></td>
                </tr>
              ))}
              <tr>
                <td colSpan="2">
                  <strong>Total</strong>
                </td>
                <td>#NAME?</td>
              </tr>
            </tbody>
          </table>

          <p>
            <strong>Note A:</strong> Include certain articles to be dropped and
            collected on route
          </p>
          <p>
            <strong>=</strong> Warehousing facility for maximum of 10 days
          </p>

          <section className="terms">
            <h3>Terms and Conditions & Additional Charges</h3>
            <ol>
              <li>
                Duties, taxes levied by authorities to be borne by consignor.
              </li>
              <li>
                Standard packing is included; inform in case of exclusives.
              </li>
              <li>
                Risk Coverage
                <ul>
                  <li>Transit insurance not by MEX.</li>
                  <li>FOV @3% of household value if opted.</li>
                  <li>Car insurance is mandatory.</li>
                </ul>
              </li>
              <li>
                Exemptions: Cash, jewellery, liquids, aquarium, etc. cannot be
                carried.
              </li>
              <li>
                Extra charges if vehicle exceeds loading distance limit or
                manpower needed.
              </li>
              <li>
                Payment:
                <ul>
                  <li>Signing: 10%</li>
                  <li>Advance: 80%</li>
                  <li>Balance: 10%</li>
                </ul>
              </li>
              <li>
                Final Docs on full payment: Invoice, Receipt, Household list,
                Insurance (if any), LR copy
              </li>
            </ol>
          </section>
        </section>

        <footer className="quotation-footer">
          <p>We assure you for our safe and efficient services</p>
          <p>Thanking you,</p>
          <div className="regarding">
            <p> My Contact Details</p>
            <p>Regards,</p>
          </div>

          <address>
            Regd. Office - 58 Shahid Smarak Bhavan, G.E. Road, Raipur (C.G.) PIN
            –492001
            <br />
            Ph. No. 0771-4218763 /64
            <br />
            Email: mexrprsales@rediffmail.com
            <br />
            Web: www.mexservices.co.in
          </address>
        </footer>
      </div>
    </>
  );
};

export default QuotationSlip;
