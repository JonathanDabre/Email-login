import React from 'react';

const TermsAndConditionModal = ({ setShowModal }) => {
  return (
    <>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
            <h4 className="text-xl font-bold text-gray-800">Terms and Conditions</h4>
            <div className="mt-4 h-64 overflow-y-auto text-sm text-gray-600">
                <p className='text-justify pr-3'> 
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque fermentum libero sit amet ipsum efficitur, et ultrices orci pharetra. 
                Vivamus non purus id nunc dictum pharetra. Duis vulputate velit id felis ullamcorper, sed varius odio fermentum. Donec malesuada 
                consectetur urna, eu tincidunt justo vulputate non. Cras nec magna in tortor volutpat varius ac eu turpis. Sed interdum leo ac 
                ligula fermentum, at interdum justo gravida. Nam interdum, eros ac faucibus fermentum, mi nisl dapibus mauris, vitae pharetra enim 
                risus in sapien. Curabitur vitae metus sit amet velit vestibulum cursus id a velit. Morbi at facilisis lorem, nec tincidunt augue. 
                Nam vehicula vehicula justo ac eleifend. Integer volutpat mi in nulla ullamcorper malesuada.
                </p>
                <p className='text-justify pr-3'>
                Nullam venenatis purus sit amet odio condimentum, et bibendum urna viverra. Morbi posuere nibh in turpis dignissim, nec posuere 
                massa egestas. Suspendisse potenti. Aenean gravida ligula vitae eros finibus, a porttitor lectus vulputate. Donec vel turpis quis 
                odio tristique varius. Curabitur rutrum suscipit quam, non congue ligula vehicula at. Nulla euismod felis turpis, in interdum ipsum 
                eleifend in. In suscipit, eros ut placerat rhoncus, augue ligula gravida magna, a pulvinar felis orci vel libero.
                </p>
                {/* Add more terms and conditions text as needed */}
            </div>
            <div className="flex items-center justify-end mt-4">
                <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-white bg-[#FD6B3C] rounded-md hover:bg-[#d65429] focus:outline-none focus:ring focus:ring-blue-300"
                >
                Close
                </button>
            </div>
            </div>
        </div>
    </>
  );
};

export default TermsAndConditionModal;
