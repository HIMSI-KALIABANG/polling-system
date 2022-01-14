const NotFound = () => {
  return (
    <div className="min-h-screen bg-primary">
      <div className="md:mx-36 mx-8 py-12">
        <div className="flex flex-col items-center">
          <div>
            <h5 className="text-9xl font-poppins font-extrabold text-secondary">404</h5>
          </div>
          <h6 className="font-poppins text-xl capitalize font-bold text-secondary tracking-wider">Page tidak ditemukan</h6>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
