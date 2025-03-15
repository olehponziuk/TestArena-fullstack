import React, { useState, useEffect } from "react";
import { getTestsList, startTest } from "../api/testsApi";
import { useNavigate } from "react-router-dom";
import { Dialog } from "@headlessui/react";

function TestsList() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTest, setSelectedTest] = useState(null);
  const navigate = useNavigate();

  const handleStart = async (e, id) =>{
    e.preventDefault();
    await startTest(id);
    navigate("/tests/test/take");
}

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const data = await getTestsList();
        if (data?.success) {
          setTests(data.tests);
        } else {
          setError("Не вдалося отримати список тестів");
        }
      } catch (err) {
        setError("Сталася помилка при завантаженні");
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, []);

  if (loading) return <p>Завантаження...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const validColors = ["red", "blue", "green", "amber", "purple", "orange", "pink", "cyan", "lime", "teal", "emerald", "violet", "indigo", "rose", "fuchsia", "sky", "yellow"];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-6 mx-12">
      {tests.map((test) => {
        let phoneColor = test.phoneColor === "yellow" ? "amber" : test.phoneColor;
        if (!validColors.includes(phoneColor)) phoneColor = "gray";

        return (
          <div 
            key={test.id} 
            className="bg-white border rounded overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            onClick={() => setSelectedTest(test)}
          >
            <div className={`h-24 bg-${phoneColor}-500`}></div>
            <div className="p-3">
              <h3 className="text-lg font-semibold">{test.title}</h3>
              <p className="text-gray-700">{test.authorName}</p>
            </div>
          </div>
        );
      })}

      {selectedTest && (
        <Dialog open={true} onClose={() => setSelectedTest(null)} className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-[35rem] max-w-full">
            <div className={`h-32 bg-${selectedTest.phoneColor}-500 rounded-t-lg`}></div>
            <div className="p-4">
              <h2 className="text-xl font-bold">{selectedTest.title}</h2>
              <p className="text-gray-600">Автор: {selectedTest.authorName}</p>
              <p className="mt-2 text-gray-700">{selectedTest.description}</p>
              <button 
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-all" 
                onClick={() => setSelectedTest(null)}
              >Закрити</button>
              <button 
                className="mx-9 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-all" 
                onClick={(e) => handleStart(e, selectedTest.id)}
              >Почати</button>
              </div>
            </div>
        </Dialog>
      )}
    </div>
  );
}

export default TestsList;
