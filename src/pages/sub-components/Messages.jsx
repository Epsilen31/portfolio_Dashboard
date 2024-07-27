import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaTrashAlt } from "react-icons/fa";
import SpecialLoadingButton from "./SpecialLoadingButton";
import {
  clearAllMessageErrors,
  deleteMessage,
  getAllMessages,
  resetMessagesSlice,
} from "@/store/slices/messagesSlice.js";

const Messages = () => {
  const { messages, loading, error, message } = useSelector(
    (state) => state.messages
  );

  const [messageId, setMessageId] = useState("");
  const dispatch = useDispatch();

  const handleMessageDelete = (id) => {
    setMessageId(id);
    dispatch(deleteMessage(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllMessageErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetMessagesSlice());
      dispatch(getAllMessages());
    }
  }, [dispatch, error, message]);

  return (
    <div className="min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-20">
      <Tabs>
        <TabsContent>
          <Card className="p-4">
            <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center bg-gray-100 p-4 rounded-t-md">
              <CardTitle className="text-xl font-semibold text-blue-700">
                Messages
              </CardTitle>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4 p-4 bg-white">
              {messages?.data?.length > 0 ? (
                messages.data.map((element) => (
                  <Card
                    key={element._id}
                    className="grid p-4 gap-4 bg-blue-50 hover:shadow-lg transition-shadow duration-200 rounded-md"
                  >
                    <div className="flex flex-col gap-2">
                      <CardDescription className="text-slate-950">
                        <span className="font-bold mr-2">Sender Name:</span>
                        {element.senderName}
                      </CardDescription>
                      <CardDescription className="text-slate-950">
                        <span className="font-bold mr-2">Subject:</span>
                        {element.subject}
                      </CardDescription>
                      <CardDescription className="text-slate-950">
                        <span className="font-bold mr-2">Message:</span>
                        {element.message}
                      </CardDescription>
                    </div>
                    <CardFooter className="flex justify-end gap-2">
                      {loading && messageId === element._id ? (
                        <SpecialLoadingButton
                          content={"Deleting"}
                          width={"w-32"}
                        />
                      ) : (
                        <Button
                          className="w-32 flex items-center justify-center gap-2 bg-red-500 text-white hover:bg-red-600 transition-colors"
                          onClick={() => handleMessageDelete(element._id)}
                        >
                          <FaTrashAlt />
                          Delete
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <CardHeader className="text-2xl text-center p-4">
                  No Messages Found!
                </CardHeader>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Messages;
