// pages/success.js

import { useRouter } from 'next/router';
import Layout from "@/components/layouts/Layout"
export default function Success() {
    const router = useRouter();
    const { transactionData } = router.query;

    if (!transactionData) {
        // Handle case where transaction data is not available
        return <div>Loading...</div>;
    }

    const parsedTransactionData = JSON.parse(transactionData);

    return (
      <Layout>
      <div class="container">
      <h1>Transaction Successful</h1>
      <div class="table-responsive">
          <table class="table table-bordered">
              <tbody>
                  <tr>
                      <th>BANKTXNID</th>
                      <td>{parsedTransactionData.BANKTXNID}</td>
                  </tr>
                  <tr>
                      <th>CHECKSUMHASH</th>
                      <td>{parsedTransactionData.CHECKSUMHASH}</td>
                  </tr>
                  <tr>
                      <th>CURRENCY</th>
                      <td>{parsedTransactionData.CURRENCY}</td>
                  </tr>
                  <tr>
                      <th>GATEWAYNAME</th>
                      <td>{parsedTransactionData.GATEWAYNAME}</td>
                  </tr>
                  <tr>
                      <th>ORDERID</th>
                      <td>{parsedTransactionData.ORDERID}</td>
                  </tr>
                  <tr>
                      <th>PAYMENTMODE</th>
                      <td>{parsedTransactionData.PAYMENTMODE}</td>
                  </tr>
                  <tr>
                      <th>RESPCODE</th>
                      <td>{parsedTransactionData.RESPCODE}</td>
                  </tr>
                  <tr>
                      <th>RESPMSG</th>
                      <td>{parsedTransactionData.RESPMSG}</td>
                  </tr>
                  <tr>
                      <th>STATUS</th>
                      <td>{parsedTransactionData.STATUS}</td>
                  </tr>
                  <tr>
                      <th>TXNAMOUNT</th>
                      <td>{parsedTransactionData.TXNAMOUNT}</td>
                  </tr>
                  <tr>
                      <th>TXNDATE</th>
                      <td>{parsedTransactionData.TXNDATE}</td>
                  </tr>
                  <tr>
                      <th>TXNID</th>
                      <td>{parsedTransactionData.TXNID}</td>
                  </tr>
              </tbody>
          </table>
      </div>
  </div>
  </Layout>
    );
}
