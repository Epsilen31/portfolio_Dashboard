import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  clearSkillErrors,
  updateSkill,
  resetSkillState,
  deleteSkill,
  getAllSkills,
} from "@/store/slices/skillSlice";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2 } from "lucide-react";

const proficiencyLevels = ["Beginner", "Intermediate", "Advanced", "Expert"];
// eslint-disable-next-line no-unused-vars
const proficiencyToPercentage = {
  Beginner: 25,
  Intermediate: 50,
  Advanced: 75,
  Expert: 100,
};

const ManageSkills = () => {
  const navigateTo = useNavigate();
  const handleReturnToDashboard = () => {
    navigateTo("/");
  };

  const { skills, error, message } = useSelector((state) => state.skills);
  const dispatch = useDispatch();

  const [proficiencies, setProficiencies] = useState({});

  useEffect(() => {
    dispatch(getAllSkills());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearSkillErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetSkillState());
      dispatch(getAllSkills());
    }
  }, [dispatch, error, message]);

  useEffect(() => {
    if (skills?.data?.length) {
      const initialProficiencies = skills.data.reduce((acc, skill) => {
        if (skill._id && proficiencyLevels.includes(skill.proficiency)) {
          acc[skill._id] = skill.proficiency;
        }
        return acc;
      }, {});
      setProficiencies(initialProficiencies);
    }
  }, [skills]);

  const handleSelectChange = (id, value) => {
    setProficiencies((prev) => {
      const newProficiencies = { ...prev, [id]: value };
      dispatch(updateSkill({ id, proficiency: value }));
      return newProficiencies;
    });
  };

  const handleDeleteSkill = (id) => {
    if (id) {
      dispatch(deleteSkill(id));
    } else {
      toast.error("Invalid skill ID.");
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Tabs defaultValue="week">
        <TabsContent value="week">
          <Card>
            <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
              <CardTitle>Manage Your Skills</CardTitle>
              <Button className="w-fit" onClick={handleReturnToDashboard}>
                Return to Dashboard
              </Button>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4">
              {skills?.data?.length ? (
                skills.data.map((element) => (
                  <Card key={element._id}>
                    <CardHeader className="text-3xl font-bold flex items-center justify-between flex-row">
                      {element.title}
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Trash2
                              onClick={() => handleDeleteSkill(element._id)}
                              className="h-5 w-5 hover:text-red-500"
                            />
                          </TooltipTrigger>
                          <TooltipContent side="right" style={{ color: "red" }}>
                            Delete
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </CardHeader>
                    <CardFooter>
                      <Label className="text-2xl mr-2">Proficiency:</Label>
                      <Select
                        value={proficiencies[element._id] || "Beginner"}
                        onValueChange={(value) =>
                          handleSelectChange(element._id, value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select proficiency" />
                        </SelectTrigger>
                        <SelectContent>
                          {proficiencyLevels.map((level) => (
                            <SelectItem key={level} value={level}>
                              {level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="text-2xl">You have not added any Skill</div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageSkills;
