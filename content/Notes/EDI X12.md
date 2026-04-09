---
title: EDI X12
draft:
tags:
  - computer-science
  - compliance
---
# What is EDI X12

EDI X12 is a standardized electronic communication protocol developed by ANSI in 1979. It defines a uniform set of document formats for exchanging business transactions between trading partners, things like purchase orders, invoices, and shipment notices. Standardizing these documents reduces manual intervention, cuts processing time, and eliminates the kind of errors that come from emailing spreadsheets back and forth.

---

## Transaction Sets

X12 is built around numbered transaction sets, each representing a specific business document. Some common ones include:

- **850** — Purchase Order
- **810** — Invoice
- **856** — Advance Ship Notice
- **204** — Motor Carrier Load Tender
- **990** — Response to a Load Tender
- **210** — Motor Carrier Bill of Lading
- **214** — Transportation Carrier Shipment Status
- **997** — Functional Acknowledgment

Think of each transaction set as a standardized form that both you and your trading partner fill out electronically. The structure enforces that every form is complete, correctly formatted, and immediately verifiable on both ends.

---

## Document Structure

Every X12 interchange uses three nested envelope levels:

**Interchange Envelope (ISA / IEA)** — The outermost wrapper for the entire transmission. The ISA header identifies the sender, receiver, delimiters, version, and a unique control number. The IEA trailer closes it out. One interchange can contain multiple functional groups.

**Functional Group (GS / GE)** — Groups a batch of transaction sets of the same type together, for example all purchase orders in one transmission. Carries its own group control number for error tracking.

**Transaction Set (ST / SE)** — The individual document itself, like a single invoice or shipment notice. The ST and SE segments mark the beginning and end, with matching control numbers.

Within a transaction set, **loops** group related segments that may repeat, like multiple line items on an invoice. **Data elements** are the individual fields within each segment, similar to form fields. Many data elements reference ANSI code lists (like state codes or currency codes) to keep values consistent across trading partners.

Control numbers at every envelope level ensure that every interchange, group, and transaction can be tracked, acknowledged, and audited end to end.

---

## Segments and Data Elements

Segments start with a three-character code that describes what kind of data follows, for example NM1 for name data or DTP for date data. Inside each segment, data elements are separated by delimiters like `*` or `|`. EDI software parses each segment and validates it against the standard definitions automatically, flagging any missing or malformed fields immediately.

---

## Communication Protocols

How EDI documents actually get transmitted varies by trading partner and use case. Common transport methods include:

**AS2** uses HTTPS with digital certificates and encryption to ensure confidentiality and authenticity. It is common for direct partner-to-partner connections.

**SFTP** (Secure File Transfer Protocol) uses SSH encryption to transfer files securely and is a common replacement for legacy FTP setups.

**HTTP-based APIs** allow modern partners to exchange EDI-equivalent data over REST APIs rather than traditional EDI formats, though the underlying transaction concepts remain the same.

**VAN** (Value-Added Network) is a third-party intermediary service that routes EDI documents between trading partners. It acts as a middleman so companies do not have to manage direct connections with every partner.

**OFTP2** is used primarily in the automotive industry for secure EDI over the internet.

Choosing the right protocol depends on what the trading partner supports, security requirements, and the existing IT infrastructure on both sides.

---

## EDI in Logistics

Major logistics companies like FedEx, UPS, and XPO rely heavily on EDI for shipment coordination. In practice this means a shipper sends a 204 load tender to a carrier, the carrier responds with a 990 accepting or rejecting it, the carrier sends 214 status updates as the shipment moves, and a 210 invoice follows when the job is complete. The whole exchange is automated and structured with no phone calls, no emails, and no manual data entry on either side.

This is also the space where platforms like Rygen's X1 become valuable. Many companies need to connect partners that speak different protocols, one on EDI, one on REST APIs, one sending flat files. An iPaaS like X1 sits in the middle, translating and routing everything so each partner speaks their native language while the data flows correctly on both ends.