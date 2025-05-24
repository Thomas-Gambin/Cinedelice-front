export default function RecentRecipeCard() {
  return (
    <div className="recipe-card">
      <img
        src="/api/placeholder/200/150"
        alt="Soupe aux choux"
        className="recipe-img"
      />
      <div className="recipe-info">
        <div className="recipe-title">Soupe aux choux</div>
        <div className="recipe-origin">De "La soupe aux choux"</div>
      </div>
      <div className="recipe-category">Plat</div>
    </div>
  );
}
