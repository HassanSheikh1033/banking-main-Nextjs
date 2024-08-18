// import HeaderBox from '@/components/HeaderBox'
// import RecentTransactions from '@/components/RecentTransactions';
// import RightSidebar from '@/components/RightSidebar';
// import TotalBalanceBox from '@/components/TotalBalanceBox';
// import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
// import { getLoggedInUser } from '@/lib/actions/user.actions';

// const Home = async ({ searchParams: { id, page } }: SearchParamProps) => {
//   const currentPage = Number(page as string) || 1;
//   const loggedIn = await getLoggedInUser();
//   const accounts = await getAccounts({ 
//     userId: loggedIn.$id 
//   })

//   if(!accounts) return;
  
//   const accountsData = accounts?.data;
//   const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

//   const account = await getAccount({ appwriteItemId })

//   return (
//     <section className="home">
//       <div className="home-content">
//         <header className="home-header">
//           <HeaderBox 
//             type="greeting"
//             title="Welcome"
//             user={loggedIn?.firstName || 'Guest'}
//             subtext="Access and manage your account and transactions efficiently."
//           />

//           <TotalBalanceBox 
//             accounts={accountsData}
//             totalBanks={accounts?.totalBanks}
//             totalCurrentBalance={accounts?.totalCurrentBalance}
//           />
//         </header>

//         <RecentTransactions 
//           accounts={accountsData}
//           transactions={account?.transactions}
//           appwriteItemId={appwriteItemId}
//           page={currentPage}
//         />
//       </div>

//       <RightSidebar 
//         user={loggedIn}
//         transactions={account?.transactions}
//         banks={accountsData?.slice(0, 2)}
//       />
//     </section>
//   )
// }

// export default Home



// Import necessary components and actions
import HeaderBox from '@/components/HeaderBox';
import RecentTransactions from '@/components/RecentTransactions';
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';

// Assuming SearchParamProps is defined elsewhere
interface SearchParamProps {
  searchParams: {
    id?: string;
    page?: string;
  };
}

const Home = async ({ searchParams: { id, page } }: SearchParamProps) => {
  try {
    const currentPage = Number(page as string) || 1;
    
    // Attempt to get the logged-in user
    const loggedIn = await getLoggedInUser();
    if (!loggedIn) {
      console.error("No logged-in user found.");
      return null; // Or render a specific component for this case
    }

    // Attempt to get the user's accounts
    const accounts = await getAccounts({ userId: loggedIn.$id });
    if (!accounts) {
      console.error("No accounts found for user.");
      return null; // Or render a specific component for this case
    }

    const accountsData = accounts.data;
    const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

    // Attempt to get the account details
    const account = await getAccount({ appwriteItemId });
    if (!account) {
      console.error("No account found for the given ID.");
      return null; // Or render a specific component for this case
    }

    return (
      <section className="home">
        <div className="home-content">
          <header className="home-header">
            <HeaderBox 
              type="greeting"
              title="Welcome"
              user={loggedIn.firstName || 'Guest'}
              subtext="Access and manage your account and transactions efficiently."
            />

            <TotalBalanceBox 
              accounts={accountsData}
              totalBanks={accounts.totalBanks}
              totalCurrentBalance={accounts.totalCurrentBalance}
            />
          </header>

          <RecentTransactions 
            accounts={accountsData}
            transactions={account.transactions}
            appwriteItemId={appwriteItemId}
            page={currentPage}
          />
        </div>

        <RightSidebar 
          user={loggedIn}
          transactions={account.transactions}
          banks={accountsData.slice(0, 2)}
        />
      </section>
    );
  } catch (error) {
    console.error("Failed to load home page:", error);
    // Render an error page or component
    return <div>Error loading the home page.</div>;
  }
};

export default Home;
