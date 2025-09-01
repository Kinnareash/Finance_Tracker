import { useState, useEffect } from 'react';
import { Plus, TrendingUp, TrendingDown, CreditCard, IndianRupee } from 'lucide-react';
import StatsCard from '../components/Dashboard/StatsCard';
import SpendingChart from '../components/Dashboard/SpendingChart';
import CategoryChart from '../components/Dashboard/CategoryChart';
import TransactionCard from '../components/Transactions/TransactionCard';
import TransactionForm from '../components/Transactions/TransactionForm';
import { useAuth } from '../context/AuthContext';
import { Transaction } from '../types';
import { getTransactions, addTransaction, updateTransaction, deleteTransaction } from '../services/transactionService';
import { formatCurrency } from '../utils/formatters';

const Dashboard: React.FC = () => {
  const { token } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    if (!token) {
      console.log('No token available - user not logged in');
      setIsLoading(false);
      return;
    }
    
    try {
      console.log('Loading transactions...');
      const data = await getTransactions(token);
      console.log('Loaded transactions:', data);
      
      setTransactions(data || []);
      setError(null);
    } catch (error: any) {
      console.error('Failed to load transactions:', error);
      setError(error.message || 'Failed to load transactions');
      setTransactions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const createSampleTransactions = async () => {
    if (!token) return;
    
    const sampleTransactions = [
      {
        type: 'income' as const,
        category: 'Salary',
        amount: 50000,
        description: 'Monthly salary',
        date: new Date().toISOString()
      },
      {
        type: 'expense' as const,
        category: 'Food',
        amount: 1200,
        description: 'Groceries',
        date: new Date().toISOString()
      },
      {
        type: 'expense' as const,
        category: 'Transport',
        amount: 800,
        description: 'Fuel',
        date: new Date().toISOString()
      },
      {
        type: 'expense' as const,
        category: 'Entertainment',
        amount: 1500,
        description: 'Movie tickets',
        date: new Date().toISOString()
      }
    ];

    try {
      for (const transaction of sampleTransactions) {
        await addTransaction(token, transaction);
      }
      // Reload transactions after adding samples
      await loadTransactions();
    } catch (error) {
      console.error('Failed to create sample transactions:', error);
    }
  };

  const handleAddTransaction = async (data: any) => {
    if (!token) return;
    
    try {
      const newTransaction = await addTransaction(token, {
        ...data,
        date: new Date(data.date).toISOString()
      });
      setTransactions(prev => [newTransaction, ...prev]);
      setIsFormOpen(false); // Close the form after successful addition
    } catch (error) {
      console.error('Failed to add transaction:', error);
    }
  };

  const handleEditTransaction = async (data: any) => {
    if (!token || !editingTransaction) return;
    
    try {
      const updatedTransaction = await updateTransaction(token, editingTransaction._id, {
        ...data,
        date: new Date(data.date).toISOString()
      });
      setTransactions(prev => 
        prev.map(t => t._id === updatedTransaction._id ? updatedTransaction : t)
      );
      setIsFormOpen(false); // Close the form after successful edit
      setEditingTransaction(undefined); // Clear editing state
    } catch (error) {
      console.error('Failed to update transaction:', error);
    }
  };

  const handleDeleteTransaction = async (id: string) => {
    if (!token) return;
    
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await deleteTransaction(token, id);
        setTransactions(prev => prev.filter(t => t._id !== id));
      } catch (error) {
        console.error('Failed to delete transaction:', error);
      }
    }
  };

  const openAddForm = () => {
    setEditingTransaction(undefined);
    setIsFormOpen(true);
  };

  const openEditForm = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingTransaction(undefined);
  };

  // Calculate stats
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  console.log('All transactions:', transactions.length);
  
  const currentMonthTransactions = transactions.filter(t => {
    const date = new Date(t.date);
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
  });

  // Get previous month transactions for trend calculation
  const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  
  const previousMonthTransactions = transactions.filter(t => {
    const date = new Date(t.date);
    return date.getMonth() === previousMonth && date.getFullYear() === previousYear;
  });

  console.log('Current month transactions:', currentMonthTransactions.length);

  const totalIncome = currentMonthTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = currentMonthTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const previousIncome = previousMonthTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const previousExpenses = previousMonthTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? ((balance / totalIncome) * 100) : 0;

  // Calculate trends
  const incomeTrend = previousIncome > 0 ? ((totalIncome - previousIncome) / previousIncome * 100) : 0;
  const expenseTrend = previousExpenses > 0 ? ((totalExpenses - previousExpenses) / previousExpenses * 100) : 0;

  console.log('Stats:', { 
    totalIncome, 
    totalExpenses, 
    balance, 
    savingsRate, 
    incomeTrend, 
    expenseTrend 
  });

  const recentTransactions = transactions.slice(0, 5);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-16">
          <CreditCard className="mx-auto h-16 w-16 text-white/40" />
          <h2 className="mt-4 text-xl font-semibold text-white">Please log in to view your dashboard</h2>
          <p className="mt-2 text-white/70">You need to be authenticated to access your financial data.</p>
          <div className="mt-6">
            <a
              href="/auth"
              className="inline-flex items-center px-6 py-3 text-sm font-medium rounded-xl shadow-lg text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 border border-blue-500/30"
            >
              Go to Login
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-16">
          <CreditCard className="mx-auto h-16 w-16 text-red-400" />
          <h2 className="mt-4 text-xl font-semibold text-white">Error loading dashboard</h2>
          <p className="mt-2 text-white/70">{error}</p>
          <div className="mt-6">
            <button
              onClick={loadTransactions}
              className="inline-flex items-center px-6 py-3 text-sm font-medium rounded-xl shadow-lg text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 border border-blue-500/30"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="mt-1 text-sm text-white/70">
            Your financial overview for {new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(new Date())}
          </p>
        </div>
        <button
          onClick={openAddForm}
          className="inline-flex items-center px-6 py-3 text-sm font-medium rounded-xl shadow-lg text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 border border-blue-500/30"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Transaction
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Current Balance"
          value={formatCurrency(balance)}
          icon={IndianRupee}
          trend={{
            value: `${Math.abs(savingsRate).toFixed(1)}%`,
            isPositive: balance >= 0
          }}
          color="bg-blue-600"
        />
        <StatsCard
          title="Monthly Income"
          value={formatCurrency(totalIncome)}
          icon={TrendingUp}
          trend={{
            value: `${Math.abs(incomeTrend).toFixed(1)}%`,
            isPositive: incomeTrend >= 0
          }}
          color="bg-green-600"
        />
        <StatsCard
          title="Monthly Expenses"
          value={formatCurrency(totalExpenses)}
          icon={TrendingDown}
          trend={{
            value: `${Math.abs(expenseTrend).toFixed(1)}%`,
            isPositive: expenseTrend <= 0
          }}
          color="bg-red-600"
        />
        <StatsCard
          title="Transactions"
          value={currentMonthTransactions.length.toString()}
          icon={CreditCard}
          trend={currentMonthTransactions.length > 0 ? {
            value: `${currentMonthTransactions.length} this month`,
            isPositive: true
          } : undefined}
          color="bg-purple-600"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <SpendingChart />
        <CategoryChart />
      </div>

      {/* Recent Transactions */}
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 rounded-2xl shadow-xl">
        <div className="px-6 py-4 border-b border-white/10">
          <h3 className="text-lg font-semibold text-white">Recent Transactions</h3>
        </div>
        <div className="p-6">
          {recentTransactions.length > 0 ? (
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <TransactionCard
                  key={transaction._id}
                  transaction={transaction}
                  onEdit={openEditForm}
                  onDelete={handleDeleteTransaction}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <CreditCard className="mx-auto h-12 w-12 text-white/40" />
              <h3 className="mt-2 text-sm font-medium text-white">No transactions yet</h3>
              <p className="mt-1 text-sm text-white/70">Get started by adding your first transaction or loading sample data.</p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={openAddForm}
                  className="inline-flex items-center px-6 py-3 text-sm font-medium rounded-xl shadow-lg text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 border border-blue-500/30"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Transaction
                </button>
                <button
                  onClick={createSampleTransactions}
                  className="inline-flex items-center px-6 py-3 text-sm font-medium rounded-xl shadow-lg text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 transition-all duration-200 border border-green-500/30"
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Load Sample Data
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Transaction Form Modal */}
      <TransactionForm
        isOpen={isFormOpen}
        onClose={closeForm}
        onSubmit={editingTransaction ? handleEditTransaction : handleAddTransaction}
        transaction={editingTransaction}
      />
    </div>
  );
};

export default Dashboard;