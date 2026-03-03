type SearchBarProps = {
  searchTerm: string;
  onSearchChange: (term: string) => void;
};

export function SearchBar({
  searchTerm,
  onSearchChange,
}: SearchBarProps): React.JSX.Element {
  return (
    <div style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="🔍 Search movies..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: '12px 16px',
          fontSize: '16px',
          border: '2px solid #444',
          borderRadius: '8px',
          backgroundColor: '#1a1a1a',
          color: '#fff',
          outline: 'none',
        }}
      />
    </div>
  );
}
